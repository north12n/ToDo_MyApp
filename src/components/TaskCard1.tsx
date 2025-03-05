import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Animated,
} from "react-native";
import {Swipeable} from "react-native-gesture-handler";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";


export type Task = {
  id: string;
  title: string;
  completed: boolean;
};

const TaskCard: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([
    { id: "1", title: "ทำการบ้าน", completed: false },
    { id: "2", title: "ออกกำลังกาย", completed: false },
    { id: "3", title: "ทำอาหารเย็น", completed: true },
  ]);

  const toggleTaskCompletion = (taskId: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (taskId: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
  };

  const renderTask = ({ item }: { item: Task }) => (
    <Swipeable
      containerStyle={styles.taskCard}
      renderRightActions={() => (
        <View style={styles.rightActions}>
          <TouchableOpacity
            style={[styles.actionButton, styles.editButton]}
            onPress={() => console.log(`Edit ${item.title}`)}
          >
            <FontAwesome name="star" size={24} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.actionButton, styles.deleteButton]}
            onPress={() => deleteTask(item.id)}
          >
            <MaterialIcons name="delete" size={24} color="white" />
          </TouchableOpacity>
        </View>
      )}
    >
      <View style={styles.taskContainer}>
        <TouchableOpacity onPress={() => toggleTaskCompletion(item.id)}>
          {item.completed ? (
            <FontAwesome name="check-circle" size={24} color="#4caf50" />
          ) : (
            <FontAwesome name="circle-thin" size={24} color="#aaa" />
          )}
        </TouchableOpacity>
        <Text style={styles.taskTitle}>{item.title}</Text>
        <TouchableOpacity>
          <FontAwesome name="flag" size={24} color="#999" />
        </TouchableOpacity>
      </View>

    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={(item) => item.id}
        renderItem={renderTask}
        ListEmptyComponent={() => (
          <Text style={styles.emptyText}>ไม่มีงานที่ต้องทำ</Text>
        )}
      />
    </View>
  );
};

export default TaskCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  taskCard: {
    marginVertical: 8,
    marginHorizontal: 12,
    borderRadius: 12,
    overflow: "hidden",
  },
  taskContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f6f8fa",
    padding: 15,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  taskTitle: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: "#2c3e50",
  },
  rightActions: {
    flexDirection: "row",
    width: 128,
  },
  actionButton: {
    justifyContent: "center",
    alignItems: "center",
    width: 64,
    height: "100%",
  },
  editButton: {
    backgroundColor: "#2196f3",
  },
  deleteButton: {
    backgroundColor: "#f44336",
  },
  emptyText: {
    textAlign: "center",
    color: "#888",
    fontSize: 16,
    marginTop: 20,
  },
});
