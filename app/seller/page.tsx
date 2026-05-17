'use client';

import Link from 'next/link';
import {
  Package,
  Eye,
  Heart,
  MessageSquare,
  TrendingUp,
  TrendingDown,
  Plus,
  ArrowRight,
  DollarSign,
  Users,
  Clock,
  MoreVertical,
  Edit,
  Trash2,
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuthStore } from '@/lib/store';
import { formatTZS } from '@/lib/data';

// Mock seller data
const sellerStats = {
  totalProducts: 24,
  activeProducts: 18,
  totalViews: 1234,
  totalFavorites: 89,
  messages: 12,
  revenue: 4500000,
};

const recentProducts = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB',
    price: 3200000,
    views: 234,
    favorites: 45,
    status: 'active',
    image: null,
  },
  {
    id: '2',
    title: 'Samsung Galaxy S23 Ultra',
    price: 2800000,
    views: 189,
    favorites: 32,
    status: 'active',
    image: null,
  },
  {
    id: '3',
    title: 'MacBook Pro M2 2023',
    price: 5500000,
    views: 156,
    favorites: 28,
    status: 'pending',
    image: null,
  },
  {
    id: '4',
    title: 'Sony PlayStation 5',
    price: 1800000,
    views: 312,
    favorites: 67,
    status: 'sold',
    image: null,
  },
];

const recentMessages = [
  { id: '1', buyer: 'John M.', product: 'iPhone 14 Pro', time: '2 min ago', unread: true },
  { id: '2', buyer: 'Sarah K.', product: 'MacBook Pro', time: '15 min ago', unread: true },
  { id: '3', buyer: 'Peter A.', product: 'Samsung TV', time: '1 hour ago', unread: false },
];

export default function SellerDashboard() {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="rounded-2xl bg-gradient-to-r from-primary to-primary/80 p-6 text-primary-foreground">
        <h1 className="text-2xl font-bold mb-2">
          Welcome back, {user?.name?.split(' ')[0] || 'Seller'}!
        </h1>
        <p className="text-primary-foreground/80 mb-4">
          Here&apos;s what&apos;s happening with your store today.
        </p>
        <Link href="/seller/products/new">
          <Button variant="secondary" className="gap-2">
            <Plus className="w-4 h-4" />
            Add New Product
          </Button>
        </Link>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sellerStats.activeProducts}</p>
                <p className="text-xs text-muted-foreground">Active Listings</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                <Eye className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sellerStats.totalViews.toLocaleString()}</p>
                <p className="text-xs text-muted-foreground">Total Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-destructive/10 flex items-center justify-center">
                <Heart className="w-5 h-5 text-destructive" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sellerStats.totalFavorites}</p>
                <p className="text-xs text-muted-foreground">Favorites</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{sellerStats.messages}</p>
                <p className="text-xs text-muted-foreground">Messages</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main content grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent products */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Recent Products</CardTitle>
              <Link href="/seller/products">
                <Button variant="ghost" size="sm" className="gap-1">
                  View All <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentProducts.map((product) => (
                  <div
                    key={product.id}
                    className="flex items-center gap-4 p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                  >
                    <div className="w-16 h-16 rounded-lg bg-muted flex items-center justify-center text-muted-foreground shrink-0">
                      IMG
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{product.title}</h4>
                      <p className="text-sm text-primary font-semibold">
                        {formatTZS(product.price)}
                      </p>
                      <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Eye className="w-3 h-3" /> {product.views}
                        </span>
                        <span className="flex items-center gap-1">
                          <Heart className="w-3 h-3" /> {product.favorites}
                        </span>
                      </div>
                    </div>
                    <Badge
                      variant={
                        product.status === 'active'
                          ? 'default'
                          : product.status === 'sold'
                          ? 'secondary'
                          : 'outline'
                      }
                      className="capitalize"
                    >
                      {product.status}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          {/* Revenue card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Estimated Revenue</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold text-primary">
                {formatTZS(sellerStats.revenue)}
              </p>
              <div className="flex items-center gap-1 mt-2 text-sm text-green-600">
                <TrendingUp className="w-4 h-4" />
                <span>+12% from last month</span>
              </div>
            </CardContent>
          </Card>

          {/* Recent messages */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-base">Recent Messages</CardTitle>
              <Link href="/seller/messages">
                <Button variant="ghost" size="sm">View All</Button>
              </Link>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentMessages.map((msg) => (
                  <div
                    key={msg.id}
                    className="flex items-start gap-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <Users className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium">{msg.buyer}</p>
                        {msg.unread && (
                          <span className="w-2 h-2 bg-primary rounded-full" />
                        )}
                      </div>
                      <p className="text-xs text-muted-foreground truncate">
                        Re: {msg.product}
                      </p>
                    </div>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {msg.time}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick tips */}
          <Card className="bg-accent/10 border-accent/30">
            <CardHeader>
              <CardTitle className="text-base">Quick Tips</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <p>Add clear photos to get more views</p>
              <p>Respond to messages within 24 hours</p>
              <p>Keep your prices competitive</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
