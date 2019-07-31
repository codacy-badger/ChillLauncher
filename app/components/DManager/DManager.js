// @flow
import React, { Component } from 'react';
import { Icon, message } from 'antd';
import fss from 'fs';
import { join, basename } from 'path';
import makeDir from 'make-dir';
import { Promise } from 'bluebird';
import { ButtonGroup, Popper, MenuItem as UIMenuItem, MenuList, ClickAwayListener, Grow, Paper } from '@material-ui/core';
import { ImportContacts } from '@material-ui/icons/';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay, faFileImport } from '@fortawesome/free-solid-svg-icons';
import Link from 'react-router-dom/Link';
import log from 'electron-log';
import {
  SortableContainer,
  SortableElement,
  arrayMove
} from 'react-sortable-hoc';
import { ContextMenu, MenuItem, ContextMenuTrigger } from 'react-contextmenu';
import { hideMenu } from 'react-contextmenu/es6/actions';
import styles from './DManager.scss';
import DInstance from '../../containers/DInstance';
import { history } from '../../store/configureStore';
import Button from 'ui/Button';

type Props = {
  selectInstance: () => void
};

const options = ['Add New Version', 'Import From Zip'];

const SortableItem = SortableElement(({ value }) => <DInstance name={value} />);

const SortableList = SortableContainer(({ items }) => {
  return (
    <div style={{ height: '100%', overflowY: 'auto' }}>
      {items.map((value, index) => (
        <SortableItem key={`item-${index}`} index={index} value={value.name} />
      ))}
    </div>
  );
});

const DManager = props => {
  const handleScroll = () => {
    hideMenu();
  };

  /* eslint-disable */
  const openLink = (url) => {
    require('electron').shell.openExternal(url);
  }

  /* eslint-enable */

  const onSortEnd = ({ oldIndex, newIndex }) => {
    // this.setState({
    //   instances: arrayMove(this.state.instances, oldIndex, newIndex)
    // });
  };

  const onSortStart = ({ node, index, collection }) => {
    hideMenu();
  };

  return (
    <main
      className={styles.main}
      onClick={e => {
        e.stopPropagation();
        props.selectInstance(null);
      }}
    >
      <ContextMenuTrigger id="contextMenu-dmanager">
        <div className={styles.content} onScroll={handleScroll}>
          {props.instances.length === 0 ? (
            <h1 className={styles.NoServerCreated}>
              YOU HAVEN'T ADDED ANY INSTANCE YET
              </h1>
          ) : (
              <SortableList
                items={props.instances}
                onSortEnd={onSortEnd}
                onSortStart={onSortStart}
                lockToContainerEdges
                axis="xy"
                distance={5}
              />
            )}
        </div>
      </ContextMenuTrigger>
      <ContextMenu
        id="contextMenu-dmanager"
        onShow={e => {
          e.stopPropagation();
          props.selectInstance(null);
        }}
      >
        <MenuItem
          onClick={() =>
            history.push({
              pathname: '/InstanceCreatorModal',
              state: { modal: true }
            })
          }
        >
          <FontAwesomeIcon icon={faPlay} style={{ marginRight: '8px' }} />
          Add New Instance
          </MenuItem>
        <MenuItem
          onClick={() =>
            history.push({
              pathname: '/importPack',
              state: { modal: true }
            })
          }
        >
          <ImportContacts css={`margin-right: 8px;`} />
          Import From Zip
          </MenuItem>
      </ContextMenu>
    </main>
  );
}

export default DManager;