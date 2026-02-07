import { Head, Link } from '@inertiajs/react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronRight, User } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface Post {
    id: number;
    title: string;
    slug: string;
    excerpt: string;
    featured_image: string | null;
    published_at: string;
    author?: {
        name: string;
    };
}

interface Props {
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        next_page_url: string | null;
        prev_page_url: string | null;
    };
    auth: {
        user: any;
    };
}

export default function BlogIndex({ posts, auth }: Props) {
    return (
        <ThemeProvider>
            <Head title="Blog - Noticias y Actualizaciones" />
            <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-50">
                <Header isAuthenticated={!!auth.user} />

                <main className="flex-1 py-20">
                    <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                        <div className="text-center mb-16 space-y-4">
                            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
                                Blog & Noticias
                            </h1>
                            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
                                Mantente al día con las últimas novedades, consejos y actualizaciones de Mister Services.
                            </p>
                        </div>

                        {posts.data.length > 0 ? (
                            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                                {posts.data.map((post) => (
                                    <div key={post.id} className="group relative flex flex-col h-full bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                                        <div className="aspect-video w-full overflow-hidden bg-gray-100 relative">
                                            {post.featured_image ? (
                                                <img
                                                    src={`/storage/${post.featured_image}`}
                                                    alt={post.title}
                                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                />
                                            ) : (
                                                <div className="flex h-full items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
                                                    <span className="text-4xl font-bold text-blue-200">MS</span>
                                                </div>
                                            )}
                                            <div className="absolute top-4 right-4">
                                                <Badge className="bg-white/90 text-blue-600 hover:bg-white backdrop-blur-sm shadow-sm border-0 font-medium">
                                                    Novedades
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex flex-1 flex-col p-6 space-y-4">
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground font-medium">
                                                <div className="flex items-center gap-1.5">
                                                    <Calendar className="h-3.5 w-3.5" />
                                                    {new Date(post.published_at).toLocaleDateString('es-ES', {
                                                        year: 'numeric',
                                                        month: 'long',
                                                        day: 'numeric'
                                                    })}
                                                </div>
                                            </div>

                                            <Link href={`/blog/${post.slug}`} className="block group-hover:text-blue-600 transition-colors">
                                                <h3 className="font-bold text-xl leading-snug line-clamp-2">
                                                    {post.title}
                                                </h3>
                                            </Link>

                                            <p className="text-muted-foreground text-sm line-clamp-3">
                                                {post.excerpt}
                                            </p>

                                            <div className="mt-auto pt-4 flex items-center justify-between border-t border-gray-50">
                                                <Link
                                                    href={`/blog/${post.slug}`}
                                                    className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                                                >
                                                    Leer artículo
                                                    <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gray-50 rounded-3xl border border-gray-100">
                                <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                                    <span className="text-2xl">📝</span>
                                </div>
                                <h3 className="text-lg font-medium text-gray-900">No hay entradas publicadas aún</h3>
                                <p className="mt-2 text-gray-500 max-w-md mx-auto">
                                    Estamos preparando contenido interesante para ti. ¡Vuelve pronto!
                                </p>
                            </div>
                        )}

                        {/* Pagination */}
                        {posts.last_page > 1 && (
                            <div className="mt-16 flex justify-center gap-2">
                                {posts.prev_page_url && (
                                    <Button variant="outline" asChild>
                                        <Link href={posts.prev_page_url}>Anterior</Link>
                                    </Button>
                                )}
                                {posts.next_page_url && (
                                    <Button variant="outline" asChild>
                                        <Link href={posts.next_page_url}>Siguiente</Link>
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    );
}
