import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import data from './AboutScreen.utils';


const columnHelper = createColumnHelper();

const columns = [
  columnHelper.accessor('firstName', {
    cell: info => <Text>{info.getValue()}</Text>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor(row => row.lastName, {
    id: 'lastName',
    cell: info => <Text>{info.getValue()}</Text>,
    header: () => <Text>Last Name</Text>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('age', {
    header: () => <Text>Age</Text>,
    cell: info => <Text>{info.renderValue()}</Text>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('visits', {
    header: () => <Text>Visits</Text>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('status', {
    header: <Text>Status</Text>,
    footer: info => info.column.id,
  }),
  columnHelper.accessor('progress', {
    header: <Text>Profile Progress</Text>,
    footer: info => info.column.id,
  }),
];

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export function AboutScreen() {

  const [sorting, setSorting] = React.useState([])

  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    state: {
      sorting,
    },
  });

  return (
    <View style={{ flex: 1 }}>


      <ScrollView horizontal={true} style={{ flex: 1 }} contentContainerStyle={{ flexDirection: 'column' }}>
        <View style={{ backgroundColor: '#DDD', position: 'absolute', zIndex: 2 }}>
          <View style={{ alignItems: 'center' }}>
            <Text>AboutScreen</Text>
          </View>
          { table.getHeaderGroups().map(headerGroup => (
              <View key={headerGroup.id} style={{ flexDirection: 'row', gap: 10 }}>
                { headerGroup.headers.map(header => (
                  <Pressable
                    key={header.id}
                    style={{
                      height: 25,
                      justifyContent: 'space-around',
                      width: 125,
                    }}
                    onPress={header.column.getToggleSortingHandler()}
                  >
                    <Text>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )
                      }
                      {{
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()] ?? null}
                    </Text>
                  </Pressable>
                ))}
              </View>
          ))}
        </View>

        <ScrollView contentContainerStyle={styles.container}>
          { table.getRowModel().rows.map(row => (
            <View key={row.id} style={{ flexDirection: 'row', gap: 10 }}>
            { row.getVisibleCells().map(cell => (
              <View
                key={cell.id}
                style={{
                  height: 25,
                  justifyContent: 'space-around',
                  width: 125,
                }}
              >
                <Text>
                  {flexRender(
                    cell.column.columnDef.cell, cell.getContext(),
                  )}
                </Text>
              </View>
            ))}
            </View>
          ))}
        </ScrollView>

      </ScrollView>
    </View>
  );
}

export default AboutScreen;
