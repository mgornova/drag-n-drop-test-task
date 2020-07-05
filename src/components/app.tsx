import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Draggable, { DraggableEvent, DraggableData } from 'react-draggable';
import { MAX_COUNT } from '../config';
import { Setup } from './setup';
import { IState as IReduxState } from '../reducer';
import { setPosition, generateBlocks, clear } from '../actions';

export const App = () => {
  // чтобы перемещаемый элемент всегда оказывался самым верхним
  const [lastZIndex, setLastZIndex] = useState(MAX_COUNT + 1);

  const dispatch = useDispatch();
  const containerSize = useSelector((state: IReduxState) => state.container);
  const blocks = useSelector((state: IReduxState) => state.blocks);

  const onSetup = useCallback((count?: number) => {
    dispatch(generateBlocks(count));
  }, [dispatch]);

  const onReset = useCallback(() => {
    dispatch(clear());
  }, [dispatch]);

  const onDragStart = useCallback((event: DraggableEvent, data: DraggableData) => {
    data.node.style.zIndex = `${lastZIndex + 1}`;
    setLastZIndex(lastZIndex + 1);
  }, [lastZIndex]);

  const onDragStop = useCallback((event: DraggableEvent, data: DraggableData) => {
    if (data.node.dataset.id !== undefined) {
      dispatch(setPosition(data.node.dataset.id, { x: data.x, y: data.y }));
    }
  }, [dispatch]);

  return <div className='app'>
    {!blocks || Object.keys(blocks).length === 0 ? <Setup onSetup={onSetup} /> : null}
      {blocks && Object.keys(blocks).length > 0 ? <>
        <div className='container' style={{width: `${containerSize.width}px`, height: `${containerSize.height}px`}}>
          {Object.keys(blocks).map((id) => (
            <Draggable
              key={id}
              bounds='parent'
              defaultPosition={{ x: blocks[id].x, y: blocks[id].y }}
              onStart={onDragStart}
              onStop={onDragStop}
            >
              <div className='draggable-block' data-id={id} style={{
                background: blocks[id].color,
                width: `${blocks[id].width}px`,
                height: `${blocks[id].height}px`,
              }} />
            </Draggable>
          ))}
        </div>
        <button className='primary-button' onClick={onReset}>Начать заново</button>
        </>
        : null}
  </div>;
}
