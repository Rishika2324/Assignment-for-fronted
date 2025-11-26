import type { Category } from '../data/dashboard'
import { WidgetCard } from './WidgetCard'

type CategorySectionProps = {
  category: Category
  onAddWidget: (categoryId: string) => void
  onRemoveWidget: (categoryId: string, widgetId: string) => void
}

export const CategorySection = ({
  category,
  onAddWidget,
  onRemoveWidget
}: CategorySectionProps) => (
  <section className="category-section">
    <header className="category-header">
      <div>
        <p className="category-kicker">{category.subtitle}</p>
        <h3>{category.title}</h3>
      </div>
      <button
        type="button"
        className="ghost-button"
        onClick={() => onAddWidget(category.id)}
      >
        + Add Widget
      </button>
    </header>

    <div className="widget-grid">
      {category.widgets.length === 0 ? (
        <div className="widget-placeholder">No widgets in this category</div>
      ) : (
        category.widgets.map((widget) => (
          <WidgetCard
            key={widget.id}
            widget={widget}
            onRemove={(widgetId) => onRemoveWidget(category.id, widgetId)}
          />
        ))
      )}
    </div>
  </section>
)

