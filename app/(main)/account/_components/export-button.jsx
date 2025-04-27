import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { format } from 'date-fns'
import jsPDF from 'jspdf'
import { Download } from 'lucide-react'
import React from 'react'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'

const ExportButton = ({ transactions }) => {
  const handleExportToExcel = () => {
    const data = transactions
      .sort((a, b) => a.date - b.date)
      .map((transaction) => ({
        Date: format(new Date(transaction.date), 'PP'),
        Description: transaction.description,
        Amount: transaction.amount,
        Type: transaction.type,
        Recurring: transaction?.isRecurring ? true : false,
      }))

    // Create a worksheet and workbook
    const worksheet = XLSX.utils.json_to_sheet(data)
    const workbook = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions')

    const currentDateMonthYear = format(new Date(), 'dd-MMMM-yyyy')
    const fileName = `${currentDateMonthYear}-trackonomy.xlsx`
    XLSX.writeFile(workbook, fileName)
  }

  const handleExportToPDF = async () => {
    const doc = new jsPDF()
    const pageWidth = doc.internal.pageSize.getWidth()

    const logo = new Image()
    logo.src = '/logo.png'

    logo.onload = () => {
      const imgWidth = 30
      const imgHeight = 30
      doc.addImage(
        logo,
        'PNG',
        (pageWidth - imgWidth) / 2,
        10,
        imgWidth,
        imgHeight
      )

      doc.setFontSize(16)
      doc.text('Transaction Report', pageWidth / 2, 40, {
        align: 'center',
      })

      const tableData = transactions.map((t) => [
        format(new Date(t.date), 'PPpp'), // Date & Time
        t.description,
        t.amount,
        t.type,
        t.isRecurring ? 'Yes' : 'No',
      ])

      let finalY = 50 // Keep track of where the table ends

      doc.autoTable({
        startY: 50,
        head: [['Date & Time', 'Description', 'Amount', 'Type', 'Recurring']],
        body: tableData,
        theme: 'grid',
        styles: { fontSize: 10 },
        didDrawPage: function (data) {
          finalY = data.cursor.y // Update finalY after table
        },
      })

      // Now AFTER table is fully drawn
      // Calculate totals
      const totalIncome = transactions
        .filter((t) => t.type.toLowerCase() === 'income')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      const totalExpense = transactions
        .filter((t) => t.type.toLowerCase() === 'expense')
        .reduce((sum, t) => sum + Number(t.amount), 0)

      const net = totalIncome - totalExpense

      // Add a new table for totals
      doc.autoTable({
        startY: finalY + 10,
        head: [['Total Income', 'Total Expense', 'Net Savings/Loss']],
        body: [
          [
            totalIncome.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
            totalExpense.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
            net.toLocaleString('en-IN', { minimumFractionDigits: 2 }),
          ],
        ],
        theme: 'grid',
        styles: {
          fontSize: 12,
          halign: 'center',
          valign: 'middle',
          cellPadding: { top: 4, bottom: 4 },
        },
        headStyles: {
          fillColor: [41, 128, 185], // Header background color
          valign: 'middle',
        },
        didParseCell: function (data) {
          if (data.section === 'body') {
            data.cell.text = [data.cell.text[0]]
          }
        },
      })

      // Save PDF
      doc.save(`${format(new Date(), 'dd-MMMM-yyyy')}-trackonomy.pdf`)
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='default' size='sm'>
          <Download className='h-4 w-4 mr-2' />
          Export Data
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={handleExportToExcel}>
          Export as Excel
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportToPDF}>
          Export as PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default ExportButton
