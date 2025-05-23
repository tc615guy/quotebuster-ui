"use client"

import { useState } from "react"
import { Plus, Trash } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

interface LineItem {
  id: number
  description: string
  quantity: string
  unitCost: string
  totalCost: string
}

export function LineItemTable() {
  const [lineItems, setLineItems] = useState<LineItem[]>([
    {
      id: 1,
      description: "",
      quantity: "",
      unitCost: "",
      totalCost: "",
    },
  ])

  const addLineItem = () => {
    if (lineItems.length < 10) {
      const newId = Math.max(0, ...lineItems.map((item) => item.id)) + 1
      setLineItems([
        ...lineItems,
        {
          id: newId,
          description: "",
          quantity: "",
          unitCost: "",
          totalCost: "",
        },
      ])
    }
  }

  const removeLineItem = (id: number) => {
    if (lineItems.length > 1) {
      setLineItems(lineItems.filter((item) => item.id !== id))
    }
  }

  const updateLineItem = (id: number, field: keyof LineItem, value: string) => {
    setLineItems(
      lineItems.map((item) => {
        if (item.id === id) {
          const updatedItem = { ...item, [field]: value }

          // Auto-calculate total cost if unit cost and quantity are numbers
          if (field === "unitCost" || field === "quantity") {
            const unitCost = Number.parseFloat(field === "unitCost" ? value : item.unitCost)
            const quantity = Number.parseFloat(field === "quantity" ? value : item.quantity)

            if (!isNaN(unitCost) && !isNaN(quantity)) {
              updatedItem.totalCost = (unitCost * quantity).toFixed(2)
            }
          }

          return updatedItem
        }
        return item
      }),
    )
  }

  const calculateTotal = () => {
    return lineItems
      .reduce((sum, item) => {
        const totalCost = Number.parseFloat(item.totalCost)
        return sum + (isNaN(totalCost) ? 0 : totalCost)
      }, 0)
      .toFixed(2)
  }

  return (
    <div className="space-y-4">
      <div className="border rounded-md overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[40%]">Description</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Total Cost</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lineItems.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    value={item.description}
                    onChange={(e) => updateLineItem(item.id, "description", e.target.value)}
                    placeholder="e.g. Paint labor"
                    className="border-0 p-0 h-8 focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell>
                  <Input
                    value={item.quantity}
                    onChange={(e) => updateLineItem(item.id, "quantity", e.target.value)}
                    placeholder="e.g. 200 ft²"
                    className="border-0 p-0 h-8 focus-visible:ring-0"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <Input
                      value={item.unitCost}
                      onChange={(e) => updateLineItem(item.id, "unitCost", e.target.value)}
                      placeholder="0.00"
                      className="border-0 p-0 h-8 focus-visible:ring-0"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <span className="mr-1">$</span>
                    <Input
                      value={item.totalCost}
                      onChange={(e) => updateLineItem(item.id, "totalCost", e.target.value)}
                      placeholder="0.00"
                      className="border-0 p-0 h-8 focus-visible:ring-0"
                      type="number"
                      step="0.01"
                    />
                  </div>
                </TableCell>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeLineItem(item.id)}
                    disabled={lineItems.length <= 1}
                    className="h-8 w-8"
                  >
                    <Trash className="h-4 w-4" />
                    <span className="sr-only">Remove</span>
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <div className="flex justify-between items-center">
        <Button
          variant="outline"
          size="sm"
          onClick={addLineItem}
          disabled={lineItems.length >= 10}
          className="flex items-center gap-1"
        >
          <Plus className="h-4 w-4" />
          Add Line Item
        </Button>
        <div className="text-right">
          <p className="text-sm text-gray-500">Total</p>
          <p className="text-lg font-semibold">${calculateTotal()}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500">{lineItems.length}/10 line items added. You can add up to 10 line items.</p>
    </div>
  )
}
