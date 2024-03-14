import { Link, router } from "expo-router";

import React, { useRef, useState } from "react";
import { Text, View, ScrollView, TouchableOpacity } from "react-native";
import CardTodolist, { Todolist } from "@/components/card-todolist";
import { MenuProvider } from "react-native-popup-menu";

import {
  QueryObserverResult,
  RefetchOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import ActionSheet, { ActionSheetRef } from "react-native-actions-sheet";
import axios from "axios";
import Toast from "react-native-toast-message";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";

export default function Page() {
  const [idTodolist, setIdTodolist] = useState("");
  const sheet = useRef<ActionSheetRef>(null);

  const mutation = useMutation({
    onSuccess: () => {
      refetch();
      Toast.show({
        type: "success",
        text1: "Delete success",
      });
    },
    mutationFn: (id: string) => {
      return axios.delete(
        `https://65f2b005034bdbecc7659037.mockapi.io/todolist/${id}`
      );
    },
  });

  const [searchQuery, setSearchQuery] = useState<string>("");

  const { isPending, error, data, refetch } = useQuery({
    queryKey: ["todolists"],
    queryFn: () =>
      fetch("https://65f2b005034bdbecc7659037.mockapi.io/todolist").then(
        (res) => res.json()
      ),
  });

  const todolists: Todolist[] = data;

  const filteredTodolists =
    todolists &&
    Array.isArray(todolists) &&
    todolists.filter((todolist) =>
      todolist.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <MenuProvider>
      <ActionSheet
        ref={sheet as any}
        containerStyle={{
          padding: 20,
        }}
      >
        <View>
          <Text className='text-center text-xl font-bold'>Delete Todolist</Text>
          <Text className='text-center text-gray-600 mt-2'>
            Are you sure if you delete the todo list it will be permanently
            deleted
          </Text>
          <TouchableOpacity
            onPress={() => {
              mutation.mutate(idTodolist);
              sheet.current.hide();
            }}
            className='w-full h-[52px] bg-red-700 my-4 flex items-center justify-center rounded-2xl'
          >
            <View className='flex flex-row items-center gap-1'>
              <Text className='text-white text-[16px]'>Delete</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              sheet.current.hide();
            }}
            className='w-full h-[52px] bg-black flex items-center justify-center rounded-2xl'
          >
            <View className='flex flex-row items-center gap-1'>
              <Text className='text-white text-[16px]'>Cancle</Text>
            </View>
          </TouchableOpacity>
        </View>
      </ActionSheet>
      <View className='flex flex-1 px-4 lg:px-6 bg-[#F6F6F6]'>
        <Header searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        {filteredTodolists && (
          <ScrollView>
            <View className='flex-1 flex-col flex gap-y-4'>
              {filteredTodolists.map((item, index) => {
                return (
                  <CardTodolist
                    setIdTodolist={setIdTodolist}
                    sheet={sheet}
                    refetch={refetch}
                    id={item.id}
                    title={item.title}
                    state={item.state}
                    key={index}
                  />
                );
              })}
            </View>
          </ScrollView>
        )}
        <Footer />
      </View>
    </MenuProvider>
  );
}
