"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { TableRowMenu, type RowMenuItem } from "@/components/table-row-menu";

export function actionsColumn<T>(getItems: (row: T) => RowMenuItem[]): ColumnDef<T> {
  return {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <TableRowMenu items={getItems(row.original)} />,
    enableSorting: false,
    enableHiding: false,
  };
}
