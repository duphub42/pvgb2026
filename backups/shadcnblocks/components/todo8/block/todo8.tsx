"use client";

import type { DragEndEvent, DragStartEvent } from "@dnd-kit/core";
import {
  closestCenter,
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ChevronDown, ChevronRight, GripVertical, Plus } from "lucide-react";
import { useMemo, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import {
  Item,
  ItemContent,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@/components/ui/item";

interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

interface Todo {
  id: string;
  title: string;
  completed: boolean;
  subtasks: Subtask[];
  expanded?: boolean;
}

const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Plan project launch",
    completed: false,
    expanded: true,
    subtasks: [
      { id: "1-1", title: "Create project timeline", completed: true },
      { id: "1-2", title: "Set up team meetings", completed: true },
      { id: "1-3", title: "Prepare presentation", completed: false },
      { id: "1-4", title: "Review budget", completed: false },
    ],
  },
  {
    id: "2",
    title: "Purchase Shadcn blocks from shadcnblocks.com",
    completed: false,
    expanded: false,
    subtasks: [
      { id: "2-1", title: "Create wireframes", completed: false },
      { id: "2-2", title: "Get stakeholder approval", completed: false },
    ],
  },
  {
    id: "3",
    title: "Write documentation",
    completed: false,
    expanded: false,
    subtasks: [],
  },
];

interface SortableTodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onToggleSubtask: (todoId: string, subtaskId: string) => void;
  onToggleExpand: (id: string) => void;
  onAddSubtask: (todoId: string, title: string) => void;
}

const SortableTodoItem = ({
  todo,
  onToggle,
  onToggleSubtask,
  onToggleExpand,
  onAddSubtask,
}: SortableTodoItemProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Translate.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const completedSubtasks = todo.subtasks.filter((st) => st.completed).length;
  const totalSubtasks = todo.subtasks.length;
  const progress =
    totalSubtasks > 0
      ? Math.round((completedSubtasks / totalSubtasks) * 100)
      : 0;

  const [newSubtaskTitle, setNewSubtaskTitle] = useState("");
  const [isAddingSubtask, setIsAddingSubtask] = useState(false);

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(todo.id, newSubtaskTitle.trim());
      setNewSubtaskTitle("");
      setIsAddingSubtask(false);
    }
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Item
        variant={todo.completed ? "muted" : "default"}
        className={`cursor-pointer items-center border-b transition-opacity ${
          todo.completed ? "opacity-60" : ""
        }`}
        onClick={() => onToggle(todo.id)}
      >
        <ItemMedia>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon-sm"
              {...attributes}
              {...listeners}
              className="cursor-grab active:cursor-grabbing"
              onClick={(e) => e.stopPropagation()}
            >
              <GripVertical className="size-4 text-muted-foreground" />
            </Button>
            <Button
              variant="ghost"
              size="icon-sm"
              onClick={(e) => {
                e.stopPropagation();
                onToggleExpand(todo.id);
              }}
            >
              {todo.expanded ? (
                <ChevronDown className="size-4 text-muted-foreground" />
              ) : (
                <ChevronRight className="size-4 text-muted-foreground" />
              )}
            </Button>
            <Checkbox
              checked={todo.completed}
              onCheckedChange={() => onToggle(todo.id)}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </ItemMedia>
        <ItemContent>
          <div className="flex items-center gap-2">
            <ItemTitle
              className={
                todo.completed ? "text-muted-foreground line-through" : ""
              }
            >
              {todo.title}
            </ItemTitle>
            {totalSubtasks > 0 && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <span className="font-medium">
                  {completedSubtasks}/{totalSubtasks}
                </span>
                <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full bg-primary transition-all"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </ItemContent>
      </Item>
      {todo.expanded && (
        <div className="border-b bg-muted/30 pl-12">
          <div className="flex flex-col">
            {todo.subtasks.map((subtask) => (
              <div
                key={subtask.id}
                className="flex items-center gap-2 border-b px-4 py-2 last:border-b-0 hover:bg-muted/50"
              >
                <Checkbox
                  checked={subtask.completed}
                  onCheckedChange={() => onToggleSubtask(todo.id, subtask.id)}
                  onClick={(e) => e.stopPropagation()}
                />
                <span
                  className={`flex-1 text-sm ${
                    subtask.completed
                      ? "text-muted-foreground line-through"
                      : ""
                  }`}
                >
                  {subtask.title}
                </span>
              </div>
            ))}
            {isAddingSubtask ? (
              <div className="flex items-center gap-2 px-4 py-2">
                <Input
                  autoFocus
                  placeholder="Subtask title"
                  value={newSubtaskTitle}
                  onChange={(e) => setNewSubtaskTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleAddSubtask();
                    }
                    if (e.key === "Escape") {
                      setIsAddingSubtask(false);
                      setNewSubtaskTitle("");
                    }
                  }}
                  className="h-8"
                  onClick={(e) => e.stopPropagation()}
                />
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddSubtask();
                  }}
                >
                  Add
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsAddingSubtask(false);
                    setNewSubtaskTitle("");
                  }}
                >
                  Cancel
                </Button>
              </div>
            ) : (
              <Button
                variant="ghost"
                size="sm"
                className="justify-start gap-2 px-4 py-2"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsAddingSubtask(true);
                }}
              >
                <Plus className="size-4" />
                Add subtask
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Todo8 = () => {
  const [todos, setTodos] = useState(initialTodos);
  const [activeTodo, setActiveTodo] = useState<Todo | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const toggleTodo = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleSubtask = (todoId: string, subtaskId: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: todo.subtasks.map((st) =>
                st.id === subtaskId ? { ...st, completed: !st.completed } : st,
              ),
            }
          : todo,
      ),
    );
  };

  const toggleExpand = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, expanded: !todo.expanded } : todo,
      ),
    );
  };

  const addSubtask = (todoId: string, title: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === todoId
          ? {
              ...todo,
              subtasks: [
                ...todo.subtasks,
                { id: `${todoId}-${Date.now()}`, title, completed: false },
              ],
              expanded: true,
            }
          : todo,
      ),
    );
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const todo = todos.find((t) => t.id === active.id);
    setActiveTodo(todo || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = todos.findIndex((item) => item.id === active.id);
      const newIndex = todos.findIndex((item) => item.id === over.id);

      if (oldIndex !== -1 && newIndex !== -1) {
        setTodos((items) => arrayMove(items, oldIndex, newIndex));
      }
    }

    setActiveTodo(null);
  };

  const allTodoIds = useMemo(() => todos.map((t) => t.id), [todos]);

  return (
    <section className="py-32">
      <div className="container">
        <div className="mx-auto flex max-w-2xl flex-col gap-8">
          <div className="flex flex-col gap-2">
            <h2 className="text-3xl font-semibold md:text-4xl">
              Todo List with Subtasks & Nested Tasks
            </h2>
            <p className="text-muted-foreground">
              Expandable tasks with nested subtasks, progress indicators, and
              drag to reorder. Complete subtasks individually or mark the parent
              task as done.
            </p>
          </div>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
          >
            <div className="flex max-w-2xl flex-col gap-4">
              <SortableContext
                items={allTodoIds}
                strategy={verticalListSortingStrategy}
              >
                <ItemGroup>
                  {todos.map((todo) => (
                    <SortableTodoItem
                      key={todo.id}
                      todo={todo}
                      onToggle={toggleTodo}
                      onToggleSubtask={toggleSubtask}
                      onToggleExpand={toggleExpand}
                      onAddSubtask={addSubtask}
                    />
                  ))}
                </ItemGroup>
              </SortableContext>
            </div>
            <DragOverlay>
              {activeTodo ? (
                <Item
                  variant={activeTodo.completed ? "muted" : "default"}
                  className="cursor-grabbing items-center border-b opacity-90 shadow-lg"
                >
                  <ItemMedia>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon-sm"
                        className="cursor-grabbing"
                      >
                        <GripVertical className="size-4 text-muted-foreground" />
                      </Button>
                      <Checkbox checked={activeTodo.completed} />
                    </div>
                  </ItemMedia>
                  <ItemContent>
                    <ItemTitle
                      className={
                        activeTodo.completed
                          ? "text-muted-foreground line-through"
                          : ""
                      }
                    >
                      {activeTodo.title}
                    </ItemTitle>
                  </ItemContent>
                </Item>
              ) : null}
            </DragOverlay>
          </DndContext>
        </div>
      </div>
    </section>
  );
};

export { Todo8 };
