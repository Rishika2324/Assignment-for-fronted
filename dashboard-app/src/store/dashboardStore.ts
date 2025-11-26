import { create } from 'zustand'
import type { Category } from '../data/dashboard'
import { initialCategories } from '../data/dashboard'

type NewWidgetInput = {
  title: string
  description: string
}

type DashboardState = {
  categories: Category[]
  searchTerm: string
  setSearchTerm: (term: string) => void
  addWidget: (categoryId: string, widget: NewWidgetInput) => void
  removeWidget: (categoryId: string, widgetId: string) => void
  syncCategoryWidgets: (categoryId: string, widgetIdsToKeep: string[]) => void
}

const generateId = (title: string) =>
  `${title.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${Date.now()}`

export const useDashboardStore = create<DashboardState>((set) => ({
  categories: initialCategories,
  searchTerm: '',
  setSearchTerm: (term) => set({ searchTerm: term }),
  addWidget: (categoryId, widgetInput) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              widgets: [
                {
                  id: generateId(widgetInput.title),
                  title: widgetInput.title.trim(),
                  description: widgetInput.description.trim()
                },
                ...category.widgets
              ]
            }
      )
    })),
  removeWidget: (categoryId, widgetId) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              widgets: category.widgets.filter((widget) => widget.id !== widgetId)
            }
      )
    })),
  syncCategoryWidgets: (categoryId, widgetIdsToKeep) =>
    set((state) => ({
      categories: state.categories.map((category) =>
        category.id !== categoryId
          ? category
          : {
              ...category,
              widgets: category.widgets.filter((widget) =>
                widgetIdsToKeep.includes(widget.id)
              )
            }
      )
    }))
}))

