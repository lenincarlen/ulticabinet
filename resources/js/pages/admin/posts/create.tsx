import { Head, useForm, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Save, Calendar as CalendarIcon, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';

export default function PostsCreate() {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        content: '',
        excerpt: '',
        status: 'draft',
        featured_image: '',
        published_at: new Date().toISOString().split('T')[0], // Default to today
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/admin/posts');
    };

    return (
        <AppLayout>
            <Head title="Nueva Entrada" />

            <form onSubmit={submit} className="p-6 max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                        <Button variant="outline" size="icon" asChild>
                            <Link href="/admin/posts">
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight">Nueva Entrada</h1>
                    </div>
                    <Button type="submit" disabled={processing}>
                        <Save className="h-4 w-4 mr-2" />
                        Guardar Entrada
                    </Button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Main Content Column (2/3) */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="space-y-4">
                            <Input
                                id="title"
                                placeholder="Añade un título"
                                className="text-2xl font-bold h-16 px-4"
                                value={data.title}
                                onChange={(e) => setData('title', e.target.value)}
                                autoFocus
                            />
                            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
                        </div>

                        <Card className="min-h-[500px] flex flex-col">
                            <CardContent className="p-0 flex-1 flex flex-col">
                                <Textarea
                                    id="content"
                                    placeholder="Escribe tu historia aquí..."
                                    className="flex-1 min-h-[500px] border-none resize-none p-6 text-lg focus-visible:ring-0"
                                    value={data.content}
                                    onChange={(e) => setData('content', e.target.value)}
                                />
                            </CardContent>
                        </Card>
                        {errors.content && <p className="text-sm text-red-500">{errors.content}</p>}

                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Extracto</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <Textarea
                                    rows={3}
                                    placeholder="Escribe un breve resumen de la entrada (opcional)"
                                    value={data.excerpt}
                                    onChange={(e) => setData('excerpt', e.target.value)}
                                />
                                <p className="text-xs text-muted-foreground mt-2">
                                    Los extractos son resúmenes opcionales hechos a mano de tu contenido.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Sidebar Column (1/3) */}
                    <div className="space-y-6">
                        {/* Publish Box */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Publicación</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="status">Estado</Label>
                                    <Select
                                        value={data.status}
                                        onValueChange={(value) => setData('status', value)}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Seleccionar estado" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="draft">Borrador</SelectItem>
                                            <SelectItem value="published">Publicado</SelectItem>
                                            <SelectItem value="archived">Archivado</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.status && <p className="text-sm text-red-500">{errors.status}</p>}
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="published_at">Fecha de publicación</Label>
                                    <div className="relative">
                                        <CalendarIcon className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input
                                            id="published_at"
                                            type="date"
                                            className="pl-9"
                                            value={data.published_at}
                                            onChange={(e) => setData('published_at', e.target.value)}
                                        />
                                    </div>
                                    {errors.published_at && <p className="text-sm text-red-500">{errors.published_at}</p>}
                                </div>

                                <div className="pt-4 border-t flex justify-end">
                                    <Button type="submit" disabled={processing} className="w-full">
                                        {data.status === 'published' ? 'Publicar' : 'Guardar Borrador'}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Featured Image Box */}
                        <Card>
                            <CardHeader>
                                <CardTitle className="text-base">Imagen Destacada</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {/* Placeholder for real image upload later */}
                                    <div className="border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center text-center hover:bg-muted/50 transition-colors cursor-pointer">
                                        <ImageIcon className="h-8 w-8 text-muted-foreground mb-2" />
                                        <p className="text-sm text-muted-foreground">
                                            Haz clic para establecer la imagen destacada
                                        </p>
                                    </div>
                                    <Input
                                        placeholder="URL de la imagen (temporal)"
                                        value={data.featured_image}
                                        onChange={(e) => setData('featured_image', e.target.value)}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </form>
        </AppLayout>
    );
}
