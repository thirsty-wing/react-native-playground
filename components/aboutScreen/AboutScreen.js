import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table'; import data from './AboutScreen.utils';


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

  const insets = useSafeAreaInsets();

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
    <View
      style={{
        flex: 1,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}
    >
      <View style={{ backgroundColor: "#BBB", alignItems: 'center' }}>
        <Text>AboutScreen</Text>
        <Text>Seach bar here</Text>
      </View>
      <ScrollView
        horizontal={true}
        centerContent={true}
        contentContainerStyle={{
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <View style={{ backgroundColor: '#DDD' }}>
          { table.getHeaderGroups().map(headerGroup => (
              <View
                key={headerGroup.id}
                style={{ flexDirection: 'row', gap: 10 }}
              >
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

        <ScrollView style={{ height: "100%" }}>
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
