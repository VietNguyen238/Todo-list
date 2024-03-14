import React, { useState } from "react";
import { Text, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { QueryObserverResult, RefetchOptions } from "@tanstack/react-query";
import { ActionSheetRef } from "react-native-actions-sheet";

export interface Todolist {
  id: string;
  title: string;
  state: boolean;
}

interface Props extends Todolist {
  refetch: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>;
  sheet: React.MutableRefObject<ActionSheetRef>;
  setIdTodolist: React.Dispatch<React.SetStateAction<string>>;
}

export default function CardTodolist({
  sheet,
  id,
  title,
  state,
  setIdTodolist,
  refetch,
}: Props) {
  const [states, setStates] = useState(state);
  return (
    <View
      style={{
        elevation: 2,
        backgroundColor: "white",
        shadowColor: "#ac9e9e",
        shadowOffset: { width: 0.5, height: 0.5 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
      }}
      className='flex flex-row w-full gap-2 p-2 rounded-lg'
    >
      <View className='flex-1 flex-col flex justify-between m-2'>
        <View className='flex flex-row justify-between'>
          <View className=''>
            <Text className='text-lg font-bold'>{title}</Text>
          </View>
          <View className=''>
            {state == true ? (
              <Text className='bg-green-400 py-1 px-3 text-white rounded-full'>
                Đã hoàn thành
              </Text>
            ) : (
              <Text className='bg-red-400 py-1 px-3 text-white rounded-full'>
                Chưa hoàn thành
              </Text>
            )}
          </View>
          <Menu>
            <MenuTrigger>
              <Ionicons name='ellipsis-vertical' size={18} color='black' />
            </MenuTrigger>
            <MenuOptions
              customStyles={{
                optionsContainer: { borderRadius: 10, padding: 5, width: 100 },
              }}
            >
              <MenuOption
                onSelect={() => {
                  setIdTodolist(id);
                  sheet.current.show();
                }}
              >
                <Text>Delete</Text>
              </MenuOption>
              <View className='h-[0.5px] w-full bg-slate-600/50' />
              <MenuOption customStyles={{}}>
                <Text>Edit</Text>
              </MenuOption>
            </MenuOptions>
          </Menu>
        </View>
      </View>
    </View>
  );
}
