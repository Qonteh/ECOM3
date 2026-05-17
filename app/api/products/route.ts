// Products API Routes
import { NextRequest, NextResponse } from 'next/server';
import { ProductRepository } from '@/lib/repositories';
import { ProductCondition } from '@/lib/db';

// GET - List products with filters
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const filters = {
      category_id: searchParams.get('category') || undefined,
      subcategory_id: searchParams.get('subcategory') || undefined,
      seller_id: searchParams.get('seller') || undefined,
      region: searchParams.get('region') || undefined,
      min_price: searchParams.get('min_price') ? parseFloat(searchParams.get('min_price')!) : undefined,
      max_price: searchParams.get('max_price') ? parseFloat(searchParams.get('max_price')!) : undefined,
      condition: (searchParams.get('condition') as ProductCondition) || undefined,
      is_featured: searchParams.get('featured') === 'true' ? true : undefined,
      is_promoted: searchParams.get('promoted') === 'true' ? true : undefined,
      search: searchParams.get('search') || undefined,
      sort_by: (searchParams.get('sort') as 'newest' | 'oldest' | 'price_low' | 'price_high' | 'popular') || 'newest',
    };

    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    const result = await ProductRepository.findAll(filters, page, limit);

    return NextResponse.json(result);
  } catch (error) {
    console.error('Products list error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// POST - Create new product
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate required fields
    const { 
      seller_id,
      category_id, 
      title, 
      description, 
      price, 
      condition, 
      region,
      images,
      attributes,
      ...rest 
    } = body;

    if (!seller_id || !category_id || !title || !description || !price || !condition || !region) {
      return NextResponse.json(
        { error: 'Missing required fields: seller_id, category_id, title, description, price, condition, region' },
        { status: 400 }
      );
    }

    // Create product
    const product = await ProductRepository.create({
      seller_id,
      category_id,
      title,
      description,
      price: parseFloat(price),
      condition,
      region,
      images,
      attributes,
      ...rest,
    });

    return NextResponse.json({
      product,
      message: 'Product created successfully',
    }, { status: 201 });
  } catch (error) {
    console.error('Product creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
