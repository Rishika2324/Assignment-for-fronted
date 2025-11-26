export type WidgetVisual =
  | {
      type: 'donut'
      data: { name: string; value: number; color: string }[]
    }
  | {
      type: 'bar'
      data: { name: string; value: number; color: string }[]
    }

export type Widget = {
  id: string
  title: string
  description: string
  visual?: WidgetVisual
}

export type Category = {
  id: string
  title: string
  subtitle: string
  widgets: Widget[]
}

export const initialCategories: Category[] = [
  {
    id: 'cspm',
    title: 'CSPM Executive Dashboard',
    subtitle: 'Cloud Accounts',
    widgets: [
      {
        id: 'cloud-accounts',
        title: 'Cloud Accounts',
        description: 'Connected (2) / Not Connected (2)',
        visual: {
          type: 'donut',
          data: [
            { name: 'Connected', value: 2, color: '#5679ff' },
            { name: 'Not connected', value: 2, color: '#d6dfff' }
          ]
        }
      },
      {
        id: 'cloud-risk',
        title: 'Cloud Account Risk Assessment',
        description: '9659 Total • Failed 1689 • Warning 681 • Passed 7253',
        visual: {
          type: 'donut',
          data: [
           { name: 'Failed', value: 1689, color: '#e7555f' },
           { name: 'Warning', value: 681, color: '#f6c343' },
          { name: 'Passed', value: 7253, color: '#1fd5a1' },
          { name: 'Not available', value: 36, color: '#cad2f4' }
          ]
        }
      }
    ]
  },
  {
    id: 'cwpp',
    title: 'CWPP Dashboard',
    subtitle: 'Namespace & Workloads',
    widgets: [
      {
        id: 'namespace-alerts',
        title: 'Top 5 Namespace Specific Alerts',
        description: 'No graph data available'
      },
      {
        id: 'workload-alerts',
        title: 'Workload Alerts',
        description: 'No graph data available'
      }
    ]
  },
  {
    id: 'registry',
    title: 'Registry Scan',
    subtitle: 'Image Risk Assessment',
    widgets: [
      {
        id: 'image-risk',
        title: 'Image Risk Assessment',
        description: '1470 total vulnerabilities • Critical 0 • High 950',
        visual: {
          type: 'bar',
          data: [
            { name: 'Critical', value: 0, color: '#f5554a' },
            { name: 'High', value: 950, color: '#ff9f43' },
            { name: 'Medium', value: 420, color: '#ffd35c' },
            { name: 'Low', value: 100, color: '#87d068' }
          ]
        }
      },
      {
        id: 'image-issues',
        title: 'Image Security Issues',
        description: '2 total images • Critical 0 • High 2 • Medium 14',
        visual: {
          type: 'bar',
          data: [
            { name: 'Critical', value: 0, color: '#e84a5f' },
            { name: 'High', value: 2, color: '#fc9645' },
            { name: 'Medium', value: 14, color: '#ffd24c' },
            { name: 'Low', value: 6, color: '#7cd1a1' }
          ]
        }
      }
    ]
  }
]

