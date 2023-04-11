import { formatCurrency } from 'src/utils/format'
const columnsProduct = [
  { name: 'img_url', align: 'left', label: 'Img Url', field: 'img_url', sortable: false },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: true },
  { name: 'amount', align: 'left', label: 'Amount', field: 'amount', sortable: false },
  { name: 'price', align: 'left', label: 'Price', field: 'price', sortable: false, format: (val) => formatCurrency(val) },
  { name: 'actions', align: 'right', label: 'Actions', field: 'actions', sortable: false }
]

export {
  columnsProduct
}
