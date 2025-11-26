import { useEffect, useMemo, useState } from 'react'
import { useDashboardStore } from '../store/dashboardStore'

type AddWidgetModalProps = {
  isOpen: boolean
  categoryId: string | null
  onClose: () => void
}

export const AddWidgetModal = ({
  isOpen,
  categoryId,
  onClose
}: AddWidgetModalProps) => {
  const categories = useDashboardStore((state) => state.categories)
  const addWidget = useDashboardStore((state) => state.addWidget)
  const syncCategoryWidgets = useDashboardStore(
    (state) => state.syncCategoryWidgets
  )

  const [selectedCategoryId, setSelectedCategoryId] = useState<string>('')
  const [newWidgetTitle, setNewWidgetTitle] = useState('')
  const [newWidgetDescription, setNewWidgetDescription] = useState('')
  const [selectionMap, setSelectionMap] = useState<Record<string, boolean>>({})

  const selectedCategory = useMemo(
    () => categories.find((item) => item.id === selectedCategoryId),
    [categories, selectedCategoryId]
  )

  useEffect(() => {
    if (!isOpen) return
    const nextCategoryId = categoryId ?? categories[0]?.id ?? ''
    setSelectedCategoryId(nextCategoryId)
  }, [categories, categoryId, isOpen])

  useEffect(() => {
    if (!selectedCategory) return
    setSelectionMap(
      selectedCategory.widgets.reduce<Record<string, boolean>>(
        (acc, widget) => ({ ...acc, [widget.id]: true }),
        {}
      )
    )
  }, [selectedCategory])

  if (!isOpen || !selectedCategory) {
    return null
  }

  const handleConfirm = () => {
    const keptWidgetIds = Object.entries(selectionMap)
      .filter(([, isChecked]) => isChecked)
      .map(([widgetId]) => widgetId)

    syncCategoryWidgets(selectedCategory.id, keptWidgetIds)

    if (newWidgetTitle.trim() && newWidgetDescription.trim()) {
      addWidget(selectedCategory.id, {
        title: newWidgetTitle,
        description: newWidgetDescription
      })
    }

    setNewWidgetTitle('')
    setNewWidgetDescription('')
    onClose()
  }

  const handleToggle = (widgetId: string) =>
    setSelectionMap((prev) => ({ ...prev, [widgetId]: !prev[widgetId] }))

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal">
        <header>
          <h3>Add Widget</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <div className="tabs">
          {categories.map((cat) => (
            <button
              key={cat.id}
              className={cat.id === selectedCategoryId ? 'active' : ''}
              onClick={() => setSelectedCategoryId(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>

        <div className="checkbox-list">
          <p className="section-label">Toggle widgets in this category</p>
          {selectedCategory.widgets.length === 0 ? (
            <p className="muted-text">No widgets yet – add one below.</p>
          ) : (
            selectedCategory.widgets.map((widget) => (
              <label key={widget.id}>
                <input
                  type="checkbox"
                  checked={selectionMap[widget.id]}
                  onChange={() => handleToggle(widget.id)}
                />
                {widget.title}
              </label>
            ))
          )}
        </div>

        <form
          className="add-widget-form"
          onSubmit={(event) => {
            event.preventDefault()
            handleConfirm()
          }}
        >
          <p className="section-label">Add new widget</p>
          <input
            type="text"
            placeholder="Widget name"
            value={newWidgetTitle}
            onChange={(event) => setNewWidgetTitle(event.target.value)}
            required
          />
          <textarea
            placeholder="Widget text"
            value={newWidgetDescription}
            onChange={(event) => setNewWidgetDescription(event.target.value)}
            required
          />

          <footer>
            <button
              type="button"
              className="ghost-button"
              onClick={onClose}
            >
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Confirm
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

