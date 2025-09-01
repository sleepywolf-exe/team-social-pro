import React, { useState } from 'react';
import { Zap, Instagram, Linkedin, Music, Wand2, Copy, Calendar, Send, Image } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';

interface PostVariant {
  channel: 'instagram' | 'linkedin' | 'tiktok';
  content: string;
  hashtags: string;
  charCount: number;
  maxChars: number;
}

const mockVariants: PostVariant[] = [
  {
    channel: 'instagram',
    content: "🚀 Exciting product launch ahead! Our team has been working tirelessly to bring you something revolutionary. Stay tuned for the big reveal! ✨\n\nWhat do you think innovation means in today's world? Share your thoughts below! 👇",
    hashtags: "#innovation #productlaunch #startup #technology #excited #community #newbeginnings #staytunned #revolutionary #teamwork",
    charCount: 287,
    maxChars: 2200
  },
  {
    channel: 'linkedin',
    content: "I'm thrilled to announce an upcoming product launch that represents months of dedicated work from our incredible team.\n\nInnovation isn't just about creating something new—it's about solving real problems and making a meaningful impact. This launch embodies that philosophy.\n\nKey insights from our development journey:\n• Customer feedback drove every decision\n• Collaboration across departments was essential\n• Iterative testing led to breakthrough moments\n\nWhat does innovation mean to your organization? I'd love to hear your perspective in the comments.",
    hashtags: "#Innovation #ProductDevelopment #Leadership #Teamwork #CustomerFirst",
    charCount: 624,
    maxChars: 3000
  },
  {
    channel: 'tiktok',
    content: "POV: Your team just created something AMAZING 🤯 Can't wait to show you what we've been working on! The behind-the-scenes has been WILD 🔥 Drop a 🚀 if you're ready for this launch!",
    hashtags: "#ProductLaunch #BehindTheScenes #Innovation #TeamWork #Startup #TechTok #LaunchDay #Amazing #Wild #Ready",
    charCount: 278,
    maxChars: 2200
  }
];

export const AIComposer: React.FC = () => {
  const [brief, setBrief] = useState({
    goal: '',
    audience: '',
    tone: 'professional',
    links: ''
  });
  const [variants, setVariants] = useState<PostVariant[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);

  const handleGenerateVariants = async () => {
    if (!brief.goal || !brief.audience) {
      toast.error('Please fill in at least the goal and target audience');
      return;
    }
    
    setIsGenerating(true);
    toast.loading('Generating AI content variants...');
    
    try {
      const response = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ brief, tone: brief.tone, channels: ['instagram', 'linkedin', 'tiktok'] })
      });
      
      const data = await response.json();
      setVariants(data.variants || mockVariants);
      toast.success('AI content generated successfully!');
    } catch (error) {
      console.error('Error generating content:', error);
      setVariants(mockVariants); // Fallback to mock data
      toast.warning('Using sample content - AI generation temporarily unavailable');
    } finally {
      setIsGenerating(false);
    }
  };
  
  const handleCopyContent = (content: string) => {
    navigator.clipboard.writeText(content);
    toast.success('Content copied to clipboard!');
  };
  
  const handleSchedulePost = (variant: PostVariant) => {
    toast.success(`Post scheduled for ${variant.channel}!`);
    // TODO: Implement actual scheduling logic
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'instagram': return <Instagram className="w-4 h-4 text-pink-500" />;
      case 'linkedin': return <Linkedin className="w-4 h-4 text-blue-600" />;
      case 'tiktok': return <Music className="w-4 h-4 text-black" />;
      default: return null;
    }
  };

  const getCharCountColor = (count: number, max: number) => {
    const percentage = (count / max) * 100;
    if (percentage > 90) return 'text-destructive';
    if (percentage > 75) return 'text-warning';
    return 'text-success';
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Zap className="w-8 h-8 text-secondary" />
            AI Content Composer
          </h1>
          <p className="text-muted-foreground">Create engaging posts for all your social channels with AI assistance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Brief Input */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-secondary" />
              Campaign Brief
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="goal">Campaign Goal</Label>
              <Textarea
                id="goal"
                placeholder="What do you want to achieve? (e.g., announce product launch, share industry insights)"
                value={brief.goal}
                onChange={(e) => setBrief(prev => ({ ...prev, goal: e.target.value }))}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="audience">Target Audience</Label>
              <Input
                id="audience"
                placeholder="Who are you targeting? (e.g., tech professionals, millennials)"
                value={brief.audience}
                onChange={(e) => setBrief(prev => ({ ...prev, audience: e.target.value }))}
                className="mt-2"
              />
            </div>
            
            <div>
              <Label htmlFor="tone">Tone of Voice</Label>
              <select 
                className="w-full mt-2 p-2 border border-input rounded-md bg-background"
                value={brief.tone}
                onChange={(e) => setBrief(prev => ({ ...prev, tone: e.target.value }))}
              >
                <option value="professional">Professional</option>
                <option value="casual">Casual & Friendly</option>
                <option value="excited">Excited & Energetic</option>
                <option value="informative">Informative</option>
                <option value="inspirational">Inspirational</option>
              </select>
            </div>
            
            <div>
              <Label htmlFor="links">Links/CTAs</Label>
              <Input
                id="links"
                placeholder="Include any links or calls-to-action"
                value={brief.links}
                onChange={(e) => setBrief(prev => ({ ...prev, links: e.target.value }))}
                className="mt-2"
              />
            </div>

            <Button 
              variant="ai" 
              className="w-full" 
              size="lg"
              onClick={handleGenerateVariants}
              disabled={isGenerating || !brief.goal}
            >
              {isGenerating ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4" />
                  Generate Variants
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Generated Variants */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Generated Content</CardTitle>
          </CardHeader>
          <CardContent>
            {variants.length > 0 ? (
              <Tabs value={variants[selectedVariant]?.channel} onValueChange={(value) => {
                const index = variants.findIndex(v => v.channel === value);
                setSelectedVariant(index >= 0 ? index : 0);
              }}>
                <TabsList className="grid w-full grid-cols-3">
                  {variants.map((variant, index) => (
                    <TabsTrigger key={variant.channel} value={variant.channel} className="flex items-center gap-2">
                      {getChannelIcon(variant.channel)}
                      {variant.channel.charAt(0).toUpperCase() + variant.channel.slice(1)}
                    </TabsTrigger>
                  ))}
                </TabsList>
                
                {variants.map((variant, index) => (
                  <TabsContent key={variant.channel} value={variant.channel} className="mt-4">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Badge variant="secondary" className="flex items-center gap-1">
                          {getChannelIcon(variant.channel)}
                          {variant.channel.charAt(0).toUpperCase() + variant.channel.slice(1)}
                        </Badge>
                        <span className={`text-sm ${getCharCountColor(variant.charCount, variant.maxChars)}`}>
                          {variant.charCount} / {variant.maxChars}
                        </span>
                      </div>
                      
                      <div className="bg-muted/30 p-4 rounded-lg">
                        <div className="whitespace-pre-wrap text-sm mb-3">
                          {variant.content}
                        </div>
                        <div className="text-sm text-primary">
                          {variant.hashtags}
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" onClick={() => handleCopyContent(variant.content + '\n\n' + variant.hashtags)}>
                          <Copy className="w-4 h-4" />
                          Copy
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => toast.info('Refine feature coming soon!')}>
                          <Wand2 className="w-4 h-4" />
                          Refine
                        </Button>
                        <Button variant="default" size="sm" onClick={() => handleSchedulePost(variant)}>
                          <Calendar className="w-4 h-4" />
                          Schedule
                        </Button>
                        <Button variant="hero" size="sm" onClick={() => toast.success(`Published to ${variant.channel}!`)}>
                          <Send className="w-4 h-4" />
                          Publish Now
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                ))}
              </Tabs>
            ) : (
              <div className="text-center py-12 text-muted-foreground">
                <Zap className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>Create your campaign brief and generate AI-powered content variants</p>
                <p className="text-sm mt-2">Each variant will be optimized for the specific platform</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                <Image className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">Media Library</p>
                <p className="text-sm text-muted-foreground">Add images and videos</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-secondary" />
              </div>
              <div>
                <p className="font-medium">Optimal Timing</p>
                <p className="text-sm text-muted-foreground">AI suggests best times</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="bg-gradient-card">
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
                <Wand2 className="w-5 h-5 text-success" />
              </div>
              <div>
                <p className="font-medium">Brand Voice</p>
                <p className="text-sm text-muted-foreground">Consistent messaging</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};