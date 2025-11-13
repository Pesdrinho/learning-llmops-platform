import { Button } from '@components/ui/button';
import { Badge } from '@components/ui/badge';
import { Filter, X } from 'lucide-react';

/**
 * Componente de filtros para guias
 * @param {Object} filters - Filtros atuais { categoria, nivel, status }
 * @param {function} onFilterChange - Callback quando filtro muda
 * @param {string[]} categorias - Lista de categorias disponíveis
 * @param {string[]} niveis - Lista de níveis disponíveis
 */
export default function GuideFilters({ 
  filters = {}, 
  onFilterChange, 
  categorias = [], 
  niveis = [] 
}) {
  const statusOptions = [
    { value: 'completo', label: 'Completo' },
    { value: 'em_desenvolvimento', label: 'Em Desenvolvimento' },
    { value: 'planejado', label: 'Planejado' },
  ];

  const handleFilterChange = (filterType, value) => {
    const newFilters = { ...filters };
    
    if (newFilters[filterType] === value) {
      delete newFilters[filterType];
    } else {
      newFilters[filterType] = value;
    }
    
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          <span className="text-sm font-medium">Filtros</span>
        </div>
        {hasActiveFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters}>
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      {/* Filtro por Categoria */}
      {categorias.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Categoria</p>
          <div className="flex flex-wrap gap-2">
            {categorias.map((categoria) => (
              <Badge
                key={categoria}
                variant={filters.categoria === categoria ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleFilterChange('categoria', categoria)}
              >
                {categoria}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por Nível */}
      {niveis.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground mb-2">Nível</p>
          <div className="flex flex-wrap gap-2">
            {niveis.map((nivel) => (
              <Badge
                key={nivel}
                variant={filters.nivel === nivel ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => handleFilterChange('nivel', nivel)}
              >
                {nivel}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Filtro por Status */}
      <div>
        <p className="text-xs font-semibold text-muted-foreground mb-2">Status</p>
        <div className="flex flex-wrap gap-2">
          {statusOptions.map((option) => (
            <Badge
              key={option.value}
              variant={filters.status === option.value ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() => handleFilterChange('status', option.value)}
            >
              {option.label}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}

