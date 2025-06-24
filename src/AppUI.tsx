import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { addBlock } from './redux/layoutSlice';

import HeroBlock from './components/HeroBlock';
import TwoColumn from './components/TwoColumn';
import ImageGrid from './components/ImageGrid';

import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

function SortableItem({ id, children }: { id: string; children: React.ReactNode }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    border: '1px solid #ccc',
    padding: '1rem',
    marginBottom: '0.5rem',
    background: '#fff',
    borderRadius: '8px'
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      {children}
    </div>
  );
}

export default function AppUI() {
  const dispatch = useDispatch();
  const blocks = useSelector((state: RootState) => state.layout.blocks);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  const handleAdd = (blockType: string) => {
    dispatch(addBlock(blockType));
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = blocks.findIndex((block, i) => `${block}-${i}` === active.id);
    const newIndex = blocks.findIndex((block, i) => `${block}-${i}` === over.id);

    const newOrder = arrayMove(blocks, oldIndex, newIndex);
    dispatch({ type: 'layout/setBlocks', payload: newOrder });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>🧱 Contentful Layout Builder</h2>

      <div style={{ marginBottom: '1rem' }}>
        <button onClick={() => handleAdd('hero')}>Add Hero Block</button>
        <button onClick={() => handleAdd('two-column')}>Add Two Column</button>
        <button onClick={() => handleAdd('image-grid')}>Add Image Grid</button>
        <button onClick={() => dispatch({ type: 'layout/undo' })}>Undo</button>
        <button onClick={() => dispatch({ type: 'layout/redo' })}>Redo</button>
      </div>

      <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={blocks.map((block, i) => `${block}-${i}`)}
          strategy={verticalListSortingStrategy}
        >
          {blocks.map((block, index) => (
            <SortableItem key={`${block}-${index}`} id={`${block}-${index}`}>
              {block === 'hero' && <HeroBlock />}
              {block === 'two-column' && <TwoColumn />}
              {block === 'image-grid' && <ImageGrid />}
            </SortableItem>
          ))}
        </SortableContext>
      </DndContext>
    </div>
  );
}
