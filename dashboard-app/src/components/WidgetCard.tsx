import type { Widget } from '../data/dashboard'
import { WidgetChart } from './WidgetChart'

type WidgetCardProps = {
  widget: Widget
  onRemove: (widgetId: string) => void
}

export const WidgetCard = ({ widget, onRemove }: WidgetCardProps) => {
  const descriptionParts = widget.description
    .split('•')
    .map((part) => part.trim())
    .filter(Boolean)

  const [primaryLine] = descriptionParts

  return (
    <article className="widget-card">
      <header className="widget-card__header">
        <div>
          <p className="widget-kicker">Widget</p>
          <h4>{widget.title}</h4>
          {primaryLine ? <p className="widget-total">{primaryLine}</p> : null}
        </div>
        <button
          type="button"
          className="icon-button"
          aria-label={`Remove ${widget.title}`}
          onClick={() => onRemove(widget.id)}
        >
          ×
        </button>
      </header>

      <div className="widget-body">
        {widget.visual ? (
          <div className="widget-visual">
            <WidgetChart visual={widget.visual} />
          </div>
        ) : null}
        {widget.visual && widget.visual.data ? (
          <ul className="widget-legend-list">
            {widget.visual.data.map((entry) => (
              <li key={`${widget.id}-${entry.name}`}>
                <span
                  className="legend-dot"
                  style={{ backgroundColor: entry.color }}
                />
                <span className="legend-label">
                  {entry.name}{' '}
                  <strong className="legend-value">{entry.value}</strong>
                </span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  )
}

