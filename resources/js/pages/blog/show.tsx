import { Head, Link } from '@inertiajs/react';
import Header from '@/components/landing/Header';
import Footer from '@/components/landing/Footer';
import ThemeProvider from '@/components/ThemeProvider';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface Post {
    id: number;
    title: string;
    content: string;
    excerpt: string;
    featured_image: string | null;
    published_at: string;
    author?: {
        name: string;
    };
}

interface Props {
    post: Post;
    auth: {
        user: any;
    };
}

export default function BlogShow({ post, auth }: Props) {
    return (
        <ThemeProvider>
            <Head title={`${post.title} - Mister Services`} />
            <div className="flex min-h-screen flex-col bg-white text-gray-900 dark:bg-[#0a0a0a] dark:text-gray-50">
                <Header isAuthenticated={!!auth.user} />

                <main className="flex-1 py-12 md:py-20">
                    <article className="container mx-auto px-4 md:px-6 max-w-4xl space-y-8">
                        {/* Header */}
                        <div className="space-y-6 text-center">
                            <div className="flex items-center justify-center gap-2 text-sm font-medium text-muted-foreground">
                                <Link
                                    href="/blog"
                                    className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors uppercase tracking-wider text-xs font-bold"
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" />
                                    Volver al Blog
                                </Link>
                                <span className="text-gray-300">•</span>
                                <span className="uppercase tracking-wider text-xs font-bold text-gray-500">Noticias</span>
                            </div>

                            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl text-gray-900 leading-tight">
                                {post.title}
                            </h1>

                            <div className="flex items-center justify-center gap-6 text-sm text-gray-500">
                                <div className="flex items-center gap-2">
                                    <div className="bg-blue-100 p-1.5 rounded-full">
                                        <Calendar className="h-4 w-4 text-blue-600" />
                                    </div>
                                    <span>
                                        {new Date(post.published_at).toLocaleDateString('es-ES', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                {post.author && (
                                    <div className="flex items-center gap-2">
                                        <div className="bg-indigo-100 p-1.5 rounded-full">
                                            <User className="h-4 w-4 text-indigo-600" />
                                        </div>
                                        <span>{post.author.name}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Featured Image */}
                        {post.featured_image && (
                            <div className="relative aspect-video w-full overflow-hidden rounded-3xl shadow-2xl border border-gray-100/50">
                                <img
                                    src={`/storage/${post.featured_image}`}
                                    alt={post.title}
                                    className="h-full w-full object-cover transition-transform hover:scale-105 duration-700"
                                />
                            </div>
                        )}

                        {/* Content */}
                        <div className="prose prose-lg prose-blue mx-auto prose-img:rounded-xl prose-headings:font-bold prose-a:text-blue-600 hover:prose-a:text-blue-500">
                            <div dangerouslySetInnerHTML={{ __html: post.content }} />
                        </div>

                        {/* Footer (Share, Tags, etc.) */}
                        <div className="pt-12 mt-12 border-t border-gray-100">
                            <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                                <div className="text-center sm:text-left">
                                    <h4 className="font-semibold text-gray-900 mb-1">¿Te gustó este artículo?</h4>
                                    <p className="text-sm text-gray-500">Compártelo con tus amigos o colegas.</p>
                                </div>
                                <div className="flex gap-4">
                                    <Button variant="outline" className="rounded-full" onClick={() => {
                                        if (navigator.share) {
                                            navigator.share({
                                                title: post.title,
                                                text: post.excerpt,
                                                url: window.location.href,
                                            });
                                        }
                                    }}>
                                        Compartir Artículo
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </article>
                </main>

                <Footer />
            </div>
        </ThemeProvider>
    );
}
