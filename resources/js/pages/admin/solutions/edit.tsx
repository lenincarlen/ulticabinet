import { Head, Link, useForm, router } from "@inertiajs/react";
import AppLayout from "@/layouts/app-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, Save } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface Solution {
    id: number;
    name: string;
    description: string;
    short_description: string | null;
    category: string | null;
    icon: string | null;
    image_path: string | null;
    is_active: boolean;
    display_order: number;
}

interface Props {
    solution: Solution;
}

export default function SolutionsEdit({ solution }: Props) {
    const { data, setData, post, processing, errors } = useForm({
        name: solution.name || "",
        description: solution.description || "",
        short_description: solution.short_description || "",
        category: solution.category || "",
        icon: solution.icon || "",
        image: null as File | null,
        is_active: Boolean(solution.is_active),
        display_order: solution.display_order || 0,
        _method: 'PUT',
    });

    const [previewImage, setPreviewImage] = useState<string | null>(
        solution.image_path ? (solution.image_path.startsWith('http') ? solution.image_path : `/storage/${solution.image_path}`) : null
    );

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Using post mainly because Inertia handles file uploads better with post, 
        // but spoofing PUT method via _method field
        post(`/admin/solutions/${solution.id}`);
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setData("image", file);
            setPreviewImage(URL.createObjectURL(file));
        }
    };

    const breadcrumbs = [
        { title: "Dashboard", href: "/dashboard" },
        { title: "Soluciones", href: "/admin/solutions" },
        { title: "Editar", href: `/admin/solutions/${solution.id}/edit` },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Editar Solución: ${solution.name}`} />

            <div className="p-6 max-w-4xl mx-auto space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon" asChild>
                            <Link href="/admin/solutions">
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                        </Button>
                        <h1 className="text-2xl font-bold tracking-tight">Editar Solución</h1>
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardContent className="p-6 space-y-6">

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Nombre */}
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nombre de la Solución</Label>
                                    <Input
                                        id="name"
                                        value={data.name}
                                        onChange={(e) => setData("name", e.target.value)}
                                        placeholder="Ej. ultiFlow"
                                        required
                                    />
                                    {errors.name && <p className="text-sm text-red-500">{errors.name}</p>}
                                </div>

                                {/* Categoría */}
                                <div className="space-y-2">
                                    <Label htmlFor="category">Categoría</Label>
                                    <Input
                                        id="category"
                                        value={data.category}
                                        onChange={(e) => setData("category", e.target.value)}
                                        placeholder="Ej. Automatización"
                                    />
                                    {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
                                </div>

                                {/* Orden */}
                                <div className="space-y-2">
                                    <Label htmlFor="display_order">Orden de Visualización</Label>
                                    <Input
                                        id="display_order"
                                        type="number"
                                        value={data.display_order}
                                        onChange={(e) => setData("display_order", parseInt(e.target.value))}
                                    />
                                    {errors.display_order && <p className="text-sm text-red-500">{errors.display_order}</p>}
                                </div>

                                {/* Icono (Opcional) */}
                                <div className="space-y-2">
                                    <Label htmlFor="icon">Nombre de Icono (Lucide)</Label>
                                    <Input
                                        id="icon"
                                        value={data.icon}
                                        onChange={(e) => setData("icon", e.target.value)}
                                        placeholder="Ej. Activity"
                                    />
                                    {errors.icon && <p className="text-sm text-red-500">{errors.icon}</p>}
                                </div>
                            </div>

                            {/* Descripción Corta */}
                            <div className="space-y-2">
                                <Label htmlFor="short_description">Descripción Corta (Subtítulo)</Label>
                                <Input
                                    id="short_description"
                                    value={data.short_description}
                                    onChange={(e) => setData("short_description", e.target.value)}
                                    placeholder="Breve descripción que aparece debajo del nombre"
                                />
                                {errors.short_description && <p className="text-sm text-red-500">{errors.short_description}</p>}
                            </div>

                            {/* Descripción Completa */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Descripción Detallada</Label>
                                <Textarea
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData("description", e.target.value)}
                                    placeholder="Detalles completos de la solución..."
                                    rows={5}
                                />
                                {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
                            </div>

                            {/* Imagen */}
                            <div className="space-y-2">
                                <Label htmlFor="image">Imagen / Logo</Label>
                                <div className="flex items-center gap-4">
                                    {previewImage && (
                                        <div className="h-20 w-20 border rounded overflow-hidden bg-gray-50 flex items-center justify-center">
                                            <img src={previewImage} alt="Preview" className="max-h-full max-w-full object-contain" />
                                        </div>
                                    )}
                                    <div className="flex-1">
                                        <Input
                                            id="image"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange}
                                        />
                                        <p className="text-xs text-gray-400 mt-1">Sube una nueva imagen para reemplazar la actual.</p>
                                    </div>
                                </div>
                                {errors.image && <p className="text-sm text-red-500">{errors.image}</p>}
                            </div>

                            {/* Activo */}
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData("is_active", !!checked)}
                                />
                                <Label htmlFor="is_active" className="cursor-pointer">Activo y visible en la web</Label>
                            </div>

                            <div className="pt-4 flex justify-end">
                                <Button type="submit" disabled={processing} className="bg-blue-600 hover:bg-blue-700 text-white">
                                    <Save className="mr-2 h-4 w-4" />
                                    Actualizar Solución
                                </Button>
                            </div>

                        </CardContent>
                    </Card>
                </form>
            </div>
        </AppLayout>
    );
}
