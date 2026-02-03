import React, { useState, useEffect, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Search, User, Phone, Mail, Loader2 } from 'lucide-react';

interface Customer {
    id: string;
    name: string;
    apellido?: string;
    full_name: string;
    phone?: string;
    email?: string;
    cedula?: string;
}

interface CustomerSearchInputProps {
    label?: string;
    placeholder?: string;
    onSelect: (customer: Customer | null) => void;
    selectedCustomer?: Customer | null;
    disabled?: boolean;
}

export default function CustomerSearchInput({
    label = "Cliente",
    placeholder = "Buscar cliente por nombre, teléfono o cédula...",
    onSelect,
    selectedCustomer = null,
    disabled = false,
}: CustomerSearchInputProps) {
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState<Customer[]>([]);
    const [isSearching, setIsSearching] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const searchRef = useRef<HTMLDivElement>(null);
    const inputRef = useRef<HTMLInputElement>(null);

    // Cerrar resultados al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Buscar clientes cuando cambia el query
    useEffect(() => {
        const searchCustomers = async () => {
            if (searchQuery.length < 2) {
                setResults([]);
                setShowResults(false);
                return;
            }

            setIsSearching(true);
            try {
                const response = await fetch(`/api/customers/search?q=${encodeURIComponent(searchQuery)}`, {
                    credentials: 'include',
                });
                const data = await response.json();
                setResults(data);
                setShowResults(true);
                setSelectedIndex(-1);
            } catch (error) {
                console.error('Error searching customers:', error);
                setResults([]);
            } finally {
                setIsSearching(false);
            }
        };

        const debounceTimer = setTimeout(searchCustomers, 300);
        return () => clearTimeout(debounceTimer);
    }, [searchQuery]);

    // Manejar selección de cliente
    const handleSelectCustomer = (customer: Customer) => {
        onSelect(customer);
        setSearchQuery(customer.full_name);
        setShowResults(false);
        setResults([]);
    };

    // Limpiar selección
    const handleClear = () => {
        onSelect(null);
        setSearchQuery('');
        setResults([]);
        setShowResults(false);
        inputRef.current?.focus();
    };

    // Manejar teclas de navegación
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!showResults || results.length === 0) return;

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault();
                setSelectedIndex(prev => (prev < results.length - 1 ? prev + 1 : prev));
                break;
            case 'ArrowUp':
                e.preventDefault();
                setSelectedIndex(prev => (prev > 0 ? prev - 1 : -1));
                break;
            case 'Enter':
                e.preventDefault();
                if (selectedIndex >= 0 && selectedIndex < results.length) {
                    handleSelectCustomer(results[selectedIndex]);
                }
                break;
            case 'Escape':
                setShowResults(false);
                break;
        }
    };

    // Actualizar query si hay un cliente seleccionado
    useEffect(() => {
        if (selectedCustomer) {
            setSearchQuery(selectedCustomer.full_name);
        } else {
            setSearchQuery('');
        }
    }, [selectedCustomer]);

    return (
        <div className="space-y-2" ref={searchRef}>
            {label && <Label>{label}</Label>}

            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        if (results.length > 0) setShowResults(true);
                    }}
                    placeholder={placeholder}
                    className="pl-9 pr-9"
                    disabled={disabled}
                />
                {isSearching && (
                    <Loader2 className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 animate-spin text-muted-foreground" />
                )}
                {selectedCustomer && !isSearching && (
                    <button
                        type="button"
                        onClick={handleClear}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                        ✕
                    </button>
                )}
            </div>

            {/* Resultados de búsqueda */}
            {showResults && results.length > 0 && (
                <Card className="absolute z-50 w-full mt-1 max-h-80 overflow-y-auto shadow-lg">
                    <div className="p-2">
                        {results.map((customer, index) => (
                            <div
                                key={customer.id}
                                className={`p-3 rounded-md cursor-pointer transition-colors ${index === selectedIndex
                                        ? 'bg-primary text-primary-foreground'
                                        : 'hover:bg-muted'
                                    }`}
                                onClick={() => handleSelectCustomer(customer)}
                                onMouseEnter={() => setSelectedIndex(index)}
                            >
                                <div className="flex items-start gap-3">
                                    <User className="w-5 h-5 mt-0.5 flex-shrink-0" />
                                    <div className="flex-1 min-w-0">
                                        <p className="font-medium truncate">{customer.full_name}</p>
                                        <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-xs opacity-90">
                                            {customer.phone && (
                                                <span className="flex items-center gap-1">
                                                    <Phone className="w-3 h-3" />
                                                    {customer.phone}
                                                </span>
                                            )}
                                            {customer.email && (
                                                <span className="flex items-center gap-1">
                                                    <Mail className="w-3 h-3" />
                                                    {customer.email}
                                                </span>
                                            )}
                                            {customer.cedula && (
                                                <span className="text-muted-foreground">
                                                    Céd: {customer.cedula}
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Sin resultados */}
            {showResults && !isSearching && searchQuery.length >= 2 && results.length === 0 && (
                <Card className="absolute z-50 w-full mt-1 p-4 text-center text-sm text-muted-foreground shadow-lg">
                    No se encontraron clientes
                </Card>
            )}
        </div>
    );
}
