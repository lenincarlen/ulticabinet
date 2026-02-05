import { Head, Link, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Calendar,
    Search,
    MoreHorizontal,
    Plus,
    FileText,
    Pencil,
    Trash
} from 'lucide-react';
import { useState } from 'react';
import { router } from '@inertiajs/react';

interface Post {
    id: string;
    title: string;
    slug: string;
    status: string;
    created_at: string;
    published_at: string | null;
}

interface Props {
    posts: {
        data: Post[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
    };
    filters: {
        search?: string;
    };
}

const statusConfig = {
    published: { label: 'Publicado', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
    draft: { label: 'Borrador', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
    archived: { label: 'Archivado', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
};

export default function PostsIndex({ posts, filters }: Props) {
    const [searchTerm, setSearchTerm] = useState(filters.search || '');

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get('/admin/posts', { search: searchTerm }, { preserveState: true });
    };

    const handleDelete = (id: string) => {
        if (confirm('¿Estás seguro de que quieres eliminar esta entrada?')) {
            router.delete(`/admin/posts/${id}`);
        }
    };

    return (
        <AppLayout>
            <Head title="Gestión del Blog" />

            <div className="space-y-6 p-6">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight">Blog / Noticias</h1>
                        <p className="text-muted-foreground">Gestiona las entradas y noticias del sitio web.</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <Button asChild>
                            <Link href="/admin/posts/create">
                                <Plus className="h-4 w-4 mr-2" />
                                Nueva Entrada
                            </Link>
                        </Button>
                    </div>
                </div>

                {/* Main Content Card */}
                <Card className="shadow-sm border-none ring-1 ring-black/5">
                    <div className="p-4 border-b flex flex-col sm:flex-row items-center justify-between gap-4">
                        {/* Search Bar */}
                        <form onSubmit={handleSearch} className="relative w-full sm:w-80">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Buscar por título..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-9 h-9"
                            />
                        </form>
                    </div>

                    <div className="relative w-full overflow-auto p-2">
                        <Table>
                            <TableHeader>
                                <TableRow className="hover:bg-muted/50">
                                    <TableHead className="w-[300px]">Título</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead className="hidden md:table-cell">Fecha Publicación</TableHead>
                                    <TableHead className="text-right">Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {posts.data.length === 0 ? (
                                    <TableRow>
                                        <TableCell colSpan={4} className="h-24 text-center">
                                            No se encontraron entradas.
                                        </TableCell>
                                    </TableRow>
                                ) : (
                                    posts.data.map((post) => {
                                        const statusInfo = statusConfig[post.status as keyof typeof statusConfig] || statusConfig.draft;

                                        return (
                                            <TableRow key={post.id} className="hover:bg-muted/50">
                                                <TableCell className="font-medium">
                                                    <div className="flex items-center gap-2">
                                                        <FileText className="h-4 w-4 text-muted-foreground" />
                                                        <Link href={`/admin/posts/${post.id}/edit`} className="hover:underline">
                                                            {post.title}
                                                        </Link>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant="secondary" className={`font-medium ${statusInfo.color}`}>
                                                        {statusInfo.label}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell className="hidden md:table-cell text-muted-foreground text-sm">
                                                    <div className="flex items-center gap-1">
                                                        <Calendar className="h-3.5 w-3.5" />
                                                        {post.published_at
                                                            ? new Date(post.published_at).toLocaleDateString('es-ES')
                                                            : 'No publicado'}
                                                    </div>
                                                </TableCell>
                                                <TableCell className="text-right">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" className="h-8 w-8 p-0">
                                                                <span className="sr-only">Abrir menú</span>
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                                                            <DropdownMenuItem asChild>
                                                                <Link href={`/admin/posts/${post.id}/edit`}>
                                                                    <Pencil className="mr-2 h-4 w-4" /> Editar
                                                                </Link>
                                                            </DropdownMenuItem>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem
                                                                className="text-red-600 focus:text-red-600"
                                                                onClick={() => handleDelete(post.id)}
                                                            >
                                                                <Trash className="mr-2 h-4 w-4" /> Eliminar
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })
                                )}
                            </TableBody>
                        </Table>
                    </div>

                    {/* Footer Pagination */}
                    {posts.last_page > 1 && (
                        <div className="p-4 border-t flex items-center justify-between">
                            <div className="text-sm text-muted-foreground">
                                Mostrando {((posts.current_page - 1) * posts.per_page) + 1} a {Math.min(posts.current_page * posts.per_page, posts.total)} de {posts.total} resultados
                            </div>
                            <div className="flex items-center gap-2">
                                <Link
                                    href={posts.current_page > 1 ? `/admin/posts?page=${posts.current_page - 1}` : '#'}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 ${posts.current_page === 1 ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    Anterior
                                </Link>
                                <Link
                                    href={posts.current_page < posts.last_page ? `/admin/posts?page=${posts.current_page + 1}` : '#'}
                                    className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 px-3 ${posts.current_page === posts.last_page ? 'pointer-events-none opacity-50' : ''}`}
                                >
                                    Siguiente
                                </Link>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </AppLayout>
    );
}
