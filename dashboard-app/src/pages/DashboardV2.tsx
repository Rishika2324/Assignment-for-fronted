import { useMemo, useState } from 'react'
import '../App.css'
import { useDashboardStore } from '../store/dashboardStore'
import { CategorySection } from '../components/CategorySection'
import { AddWidgetModal } from '../components/AddWidgetModal'

export const DashboardV2 = () => {
  const categories = useDashboardStore((state) => state.categories)
  const searchTerm = useDashboardStore((state) => state.searchTerm)
  const removeWidget = useDashboardStore((state) => state.removeWidget)

  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [timeRange, setTimeRange] = useState('2d')

  const filteredCategories = useMemo(
    () =>
      categories
        .map((category) => {
          if (!searchTerm.trim()) return category
          const lowered = searchTerm.toLowerCase()
          const widgets = category.widgets.filter(
      (widget) =>
              widget.title.toLowerCase().includes(lowered) ||
              widget.description.toLowerCase().includes(lowered)       )
          return { ...category, widgets }
        })
        .filter((category) => (searchTerm.trim() ? category.widgets.length > 0 : true)),
    [categories, searchTerm]
  )
return (
<div className="app-shell">
<header className="page-header">
     <div className="page-meta">
    <h2>CNAPP Dashboard</h2>
         
   </div>

        <div className="header-actions">
       <div className="toolbar">
            <button
              type="button"
              className="icon-button"
              aria-label="Refresh data"
     onClick={() => window.location.reload()}
            >
              ↻
            </button>
   <select
              value={timeRange}
      onChange={(event) => setTimeRange(event.target.value)}
              className="time-range"
            >
       <option value="2d">Last 2 days</option>
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
            </select>
     <button
              type="button"
              className="primary-button"
        onClick={() => setActiveCategory(categories[0]?.id ?? null)}
            >
              + Add Widget
     </button>
          </div>
        </div>
      </header>

      <main>
        {filteredCategories.length === 0 ? (
          <div className="empty-state">
      <p>No widgets found for “{searchTerm}”.</p>
          </div>
    ) : (
          filteredCategories.map((category) => (
            <CategorySection
       key={category.id}
              category={category}
      onAddWidget={(categoryId) => setActiveCategory(categoryId)}
              onRemoveWidget={(categoryId, widgetId) => removeWidget(categoryId, widgetId)}
            />
       ))
        )}
      </main>

      <AddWidgetModal
        isOpen={Boolean(activeCategory)}
        categoryId={activeCategory}
        onClose={() => setActiveCategory(null)}
      />
    </div>
  )
}

export default DashboardV2
