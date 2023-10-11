import React, { useRef } from 'react';
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
      columnPinning: { left: ['firstName']}, // only reorders cols. need style
    },
  });

  const leftScroll = useRef(null);
  const rightScroll = useRef(null);

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

      <View
        style={{ flexDirection: "row", flex: 1 }}
      >

        <ScrollView
          onScroll={e => {
            const { y } = e.nativeEvent.contentOffset;
            leftScroll.current?.scrollTo({ y, animated: false });
          }}
          ref={rightScroll}
          showsVerticalScrollIndicator={false}
          stickyHeaderIndices={[0]}
        >
          <Pressable
            style={{
              backgroundColor: '#DDD',
              height: 25,
              justifyContent: 'space-around',
              width: 125,
            }}
          >
            <Text>
              { flexRender(
                table.getHeaderGroups()[0].headers[0].column.columnDef.header,
                table.getHeaderGroups()[0].headers[0].getContext(),
              )}
            </Text>
          </Pressable>
            { table.getRowModel().rows.map(row => (
              <View
                key={row.id}
                style={{
                  height: 25,
                  justifyContent: 'space-around',
                  width: 125,
                }}
              >
                <Text>
                  {flexRender(
                    row.getVisibleCells()[0].column.columnDef.cell,
                    row.getVisibleCells()[0].getContext(),
                  )}
                </Text>
              </View>
            ))}
        </ScrollView>


        <ScrollView
          contentContainerStyle={{
            flexDirection: 'column',
          }}
          horizontal={true}
        >
          <ScrollView
            onScroll={e => {
              const { y } = e.nativeEvent.contentOffset;
              rightScroll.current?.scrollTo({ y, animated: false });
            }}
            ref={leftScroll}
            stickyHeaderIndices={[0]}
            style={{ height: "100%" }}
          >
            <View style={{ backgroundColor: '#DDD' }}>
              { table.getHeaderGroups().map(headerGroup => (
                  <View
                    key={headerGroup.id}
                    style={{ flexDirection: 'row', gap: 10 }}
                  >
                    { headerGroup.headers.map((header, index) => (
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

    </View>
  );
}

export default AboutScreen;
