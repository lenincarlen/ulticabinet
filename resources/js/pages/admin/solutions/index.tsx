import { Head, Link, router, usePage } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    Plus,
    Search,
    MoreHorizontal,
    Edit,
    Trash,
    Image as ImageIcon
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { SharedData } from "@/types";

interface Solution {
    id: number;
    name: string;
    slug: string;
    category: string;
    image_path: string | null;
    icon: string | null;
    is_active: boolean;
    display_order: number;
}

interface Props {
    solutions: {
        data: Solution[];
        links: any[];
    };
    filters: {
        search: string;
    };
}

export default function SolutionsIndex({ solutions, filters }: Props) {
    const [search, setSearch] = useState(filters.search || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        router.get(
            "/admin/solutions",
            { search },
            { preserveState: true }
        );
    };

    const handleDelete = (id: number) => {
        if (confirm("¿Estás seguro de que deseas eliminar esta solución?")) {
            router.delete(`/admin/solutions/${id}`);
        }
    };

    const getImageUrl = (path: string | null) => {
        if (!path) return null;
        if (path.startsWith('http')) return path;
        return `/storage/${path}`;
    };

    const breadcrumbs = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Soluciones", href: "/admin/solutions" },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Soluciones" />

            <div className="p-6 space-y-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <h1 className="text-2xl font-bold tracking-tight">Gestión de Soluciones</h1>
                    <Button asChild>
                        <Link href="/admin/solutions/create">
                            <Plus className="mr-2 h-4 w-4" />
                            Nueva Solución
                        </Link>
                    </Button>
                </div>

                <div className="flex items-center gap-4 bg-white p-4  border">
                    <form onSubmit={handleSearch} className="flex-1 flex gap-2">
                        <div className="relative flex-1 max-w-sm">
                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                            <Input
                                type="search"
                                placeholder="Buscar soluciones..."
                                className="pl-9"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                        <Button type="submit" variant="secondary">Buscar</Button>
                    </form>
                </div>

                <div className="bg-white   shadow-sm border overflow-hidden p-6">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead className="w-[80px]">Orden</TableHead>
                                <TableHead className="w-[100px]">Imagen</TableHead>
                                <TableHead>Nombre</TableHead>
                                <TableHead>Categoría</TableHead>
                                <TableHead>Icono</TableHead>
                                <TableHead>Estado</TableHead>
                                <TableHead className="text-right">Acciones</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {solutions.data.map((solution) => (
                                <TableRow key={solution.id}>
                                    <TableCell className="font-medium">
                                        {solution.display_order}
                                    </TableCell>
                                    <TableCell>
                                        {solution.image_path ? (
                                            <img
                                                src={getImageUrl(solution.image_path) || ''}
                                                alt={solution.name}
                                                className="h-10 w-10 rounded object-cover border"
                                            />
                                        ) : (
                                            <div className="h-10 w-10 rounded bg-gray-100 flex items-center justify-center border">
                                                <ImageIcon className="h-4 w-4 text-gray-400" />
                                            </div>
                                        )}
                                    </TableCell>
                                    <TableCell className="font-medium">
                                        {solution.name}
                                        <div className="text-xs text-gray-500">{solution.slug}</div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{solution.category || 'N/A'}</Badge>
                                    </TableCell>
                                    <TableCell className="font-mono text-xs">
                                        {solution.icon || '-'}
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={solution.is_active ? "default" : "secondary"}>
                                            {solution.is_active ? "Activo" : "Inactivo"}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem asChild>
                                                    <Link href={`/admin/solutions/${solution.id}/edit`}>
                                                        <Edit className="mr-2 h-4 w-4" />
                                                        Editar
                                                    </Link>
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    className="text-red-600 focus:text-red-600"
                                                    onClick={() => handleDelete(solution.id)}
                                                >
                                                    <Trash className="mr-2 h-4 w-4" />
                                                    Eliminar
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                            {solutions.data.length === 0 && (
                                <TableRow>
                                    <TableCell colSpan={7} className="h-24 text-center text-gray-500">
                                        No se encontraron soluciones.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </AppLayout>
    );
}
