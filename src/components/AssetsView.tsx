import React, { useState } from 'react';
import { Upload, Search, Filter, Grid, List, Eye, Download, Trash2, Tag, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const mockAssets = [
  { id: 1, name: 'summer_campaign_hero.jpg', type: 'image', size: '2.3 MB', tags: ['summer', 'campaign'], uploadDate: '2024-02-15', rightsExpiry: '2024-12-31' },
  { id: 2, name: 'product_video.mp4', type: 'video', size: '45.2 MB', tags: ['product', 'demo'], uploadDate: '2024-02-10', rightsExpiry: '2025-06-30' },
  { id: 3, name: 'logo_variants.zip', type: 'archive', size: '1.8 MB', tags: ['logo', 'brand'], uploadDate: '2024-02-08', rightsExpiry: null },
  { id: 4, name: 'testimonial_photo.jpg', type: 'image', size: '3.1 MB', tags: ['testimonial', 'customer'], uploadDate: '2024-02-05', rightsExpiry: '2024-08-15' },
];

export const AssetsView = () => {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');

  const filteredAssets = mockAssets.filter(asset => {
    const matchesSearch = asset.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         asset.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = filterType === 'all' || asset.type === filterType;
    return matchesSearch && matchesType;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Media Assets</h1>
          <p className="text-muted-foreground">Manage your media library and digital assets</p>
        </div>
        <Button className="bg-gradient-primary">
          <Upload className="w-4 h-4" />
          Upload Assets
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Assets</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,347</div>
            <p className="text-xs text-muted-foreground">+180 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.4 GB</div>
            <p className="text-xs text-muted-foreground">of 50 GB</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Expiring Rights</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-warning">Next 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Most Used Tag</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Campaign</div>
            <p className="text-xs text-muted-foreground">156 assets</p>
          </CardContent>
        </Card>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative max-w-md flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search assets by name or tags..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger className="w-[140px]">
              <Filter className="w-4 h-4" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="image">Images</SelectItem>
              <SelectItem value="video">Videos</SelectItem>
              <SelectItem value="archive">Archives</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-center gap-1 border rounded-lg p-1">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
          >
            <Grid className="w-4 h-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
          >
            <List className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Assets Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <Card key={asset.id} className="group hover:shadow-lg transition-shadow">
              <CardContent className="p-4">
                <div className="aspect-square bg-muted rounded-lg mb-3 flex items-center justify-center">
                  <div className="text-4xl">
                    {asset.type === 'image' ? '🖼️' : asset.type === 'video' ? '🎥' : '📁'}
                  </div>
                </div>
                <div className="space-y-2">
                  <h3 className="font-medium truncate">{asset.name}</h3>
                  <p className="text-sm text-muted-foreground">{asset.size}</p>
                  <div className="flex flex-wrap gap-1">
                    {asset.tags.map((tag) => (
                      <Badge key={tag} variant="secondary" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  {asset.rightsExpiry && (
                    <p className="text-xs text-warning">Rights expire: {asset.rightsExpiry}</p>
                  )}
                  <div className="flex items-center gap-1 pt-2">
                    <Button variant="ghost" size="sm">
                      <Eye className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Download className="w-3 h-3" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="space-y-0">
              {filteredAssets.map((asset, index) => (
                <div key={asset.id} className={`flex items-center justify-between p-4 hover:bg-muted/50 ${index !== filteredAssets.length - 1 ? 'border-b' : ''}`}>
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-muted rounded flex items-center justify-center">
                      {asset.type === 'image' ? '🖼️' : asset.type === 'video' ? '🎥' : '📁'}
                    </div>
                    <div>
                      <h3 className="font-medium">{asset.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>{asset.size}</span>
                        <span>•</span>
                        <span>{asset.uploadDate}</span>
                        {asset.rightsExpiry && (
                          <>
                            <span>•</span>
                            <span className="text-warning">Expires: {asset.rightsExpiry}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex flex-wrap gap-1">
                      {asset.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex items-center gap-1">
                      <Button variant="ghost" size="sm">
                        <Eye className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};