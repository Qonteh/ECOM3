'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Search,
  Plus,
  Filter,
  Eye,
  Heart,
  Edit,
  Trash2,
  MoreVertical,
  Package,
  CheckCircle,
  Clock,
  XCircle,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { formatTZS } from '@/lib/data';
import { cn } from '@/lib/utils';

const products = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB',
    price: 3200000,
    category: 'Electronics',
    views: 234,
    favorites: 45,
    status: 'active',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra',
    price: 2800000,
    category: 'Electronics',
    views: 189,
    favorites: 32,
    status: 'active',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    title: 'MacBook Pro M2 2023',
    price: 5500000,
    category: 'Electronics',
    views: 156,
    favorites: 28,
    status: 'pending',
    createdAt: '2024-01-13',
  },
  {
    id: '4',
    title: 'Sony PlayStation 5',
    price: 1800000,
    category: 'Electronics',
    views: 312,
    favorites: 67,
    status: 'sold',
    createdAt: '2024-01-12',
  },
  {
    id: '5',
    title: 'Toyota Corolla 2019',
    price: 45000000,
    category: 'Vehicles',
    views: 567,
    favorites: 89,
    status: 'active',
    createdAt: '2024-01-11',
  },
  {
    id: '6',
    title: 'Kitenge Dress Collection',
    price: 85000,
    category: 'Fashion',
    views: 123,
    favorites: 34,
    status: 'rejected',
    createdAt: '2024-01-10',
  },
];

const statusConfig = {
  active: { label: 'Active', icon: CheckCircle, color: 'text-green-600 bg-green-100' },
  pending: { label: 'Pending', icon: Clock, color: 'text-yellow-600 bg-yellow-100' },
  sold: { label: 'Sold', icon: Package, color: 'text-blue-600 bg-blue-100' },
  rejected: { label: 'Rejected', icon: XCircle, color: 'text-red-600 bg-red-100' },
};

export default function SellerProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    all: products.length,
    active: products.filter((p) => p.status === 'active').length,
    pending: products.filter((p) => p.status === 'pending').length,
    sold: products.filter((p) => p.status === 'sold').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">My Products</h1>
          <p className="text-muted-foreground">Manage and track your listings</p>
        </div>
        <Link href="/seller/products/new">
          <Button className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'All Products', value: stats.all, status: 'all' },
          { label: 'Active', value: stats.active, status: 'active' },
          { label: 'Pending', value: stats.pending, status: 'pending' },
          { label: 'Sold', value: stats.sold, status: 'sold' },
        ].map((stat) => (
          <button
            key={stat.status}
            onClick={() => setStatusFilter(stat.status)}
            className={cn(
              'text-left p-4 rounded-xl border transition-all',
              statusFilter === stat.status
                ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
                : 'border-border hover:border-primary/50'
            )}
          >
            <p className="text-2xl font-bold">{stat.value}</p>
            <p className="text-sm text-muted-foreground">{stat.label}</p>
          </button>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="sold">Sold</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Products list */}
      <Card>
        <CardContent className="p-0">
          {filteredProducts.length === 0 ? (
            <div className="p-12 text-center">
              <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="font-semibold mb-2">No products found</h3>
              <p className="text-muted-foreground mb-4">
                {searchQuery
                  ? 'Try adjusting your search or filters'
                  : 'Start by adding your first product'}
              </p>
              <Link href="/seller/products/new">
                <Button>Add Product</Button>
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {filteredProducts.map((product) => {
                const status = statusConfig[product.status as keyof typeof statusConfig];
                const StatusIcon = status.icon;
                return (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-4 hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-20 h-20 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                      IMG
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium truncate">{product.title}</h3>
                        <Badge variant="outline" className="shrink-0">
                          {product.category}
                        </Badge>
                      </div>
                      <p className="text-lg font-bold text-primary">
                        {formatTZS(product.price)}
                      </p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" /> {product.views} views
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-4 h-4" /> {product.favorites} favorites
                        </span>
                        <span>Listed {product.createdAt}</span>
                      </div>
                    </div>
                    <div
                      className={cn(
                        'hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
                        status.color
                      )}
                    >
                      <StatusIcon className="w-4 h-4" />
                      {status.label}
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
