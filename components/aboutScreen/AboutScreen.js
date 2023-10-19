import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
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

export function AboutScreen({ navigation }) {

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
      columnPinning: { left: ['firstName']}, // only reorders cols. need style
    },
  });

  return (
    <View
      style={{
        flex: 1,
        //paddingTop: insets.top,
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
        <ScrollView style={{ height: "100%" }} stickyHeaderIndices={[0]}>
          <View style={{ backgroundColor: '#DDD' }}>
            { table.getHeaderGroups().map(headerGroup => (
                <View
                  key={headerGroup.id}
                  style={{ flexDirection: 'row', gap: 10 }}
                >
                  { headerGroup.headers.map(header => (
                    <View
                      key={header.id}
                      style={{
                        alignItems: 'center',
                        height: 25,
                        width: 125,
                        flexDirection: 'row',
                        gap: 5,
                      }}
                    >
                      <Text>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                              header.column.columnDef.header,
                              header.getContext(),
                            )
                          }
                      </Text>
                      <Pressable
                        onPress={(e) => {
			  header.column.getToggleSortingHandler()(e);
			  navigation.push('About', { greeting: "hi" });
			}}
                      >
                        <Text>
                          {{
                            asc: '⬆️',
                            desc: '⬇️',
                          }[header.column.getIsSorted()] ?? '↕️'}
                        </Text>
                      </Pressable>
                      <Pressable>
                        <Text>🔍</Text>
                      </Pressable>
                    </View>
                  ))}
                </View>
            ))}
          </View>
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
