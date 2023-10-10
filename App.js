import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Button, Pressable, ScrollView, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import data from './data';

const Stack = createNativeStackNavigator();

const linking = {
  config: {
    screens: {
      Home: "",
      About: "About",
    },
  },
};

export default function App() {
  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="About" component={AboutScreen}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = {
  container: {
    backgroundColor: '#fff',
  },
};

const HomeScreen = ({ navigation }) => <View style={styles.container}>
  <Text>HomeScreen</Text>
  <Button title="Go to About" onPress={() => navigation.navigate("About")}/>
</View>;

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
]

const AboutScreen = () => {

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
    <View>
      <View style={{ alignItems: 'center', position: 'sticky' }}>
        <Text>AboutScreen</Text>
      </View>


      <ScrollView horizontal={true} contentContainerStyle={{ flexDirection: 'column' }}>
        <View style={{ backgroundColor: '#DDD' }}>
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
};
