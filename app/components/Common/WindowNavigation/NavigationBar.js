// @flow
import React, { useState, useEffect } from 'react';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
import { ipcRenderer } from 'electron';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCog } from '@fortawesome/free-solid-svg-icons';
import styles from './NavigationBar.scss';
import HorizontalMenu from './components/HorizontalMenu/HorizontalMenu';
import logo from '../../../assets/images/logo.png';
import { useTheme } from '@material-ui/core';

export default props => {
  const [updateAvailable, setUpdateAvailable] = useState(false);
  const theme = useTheme();

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      ipcRenderer.send('check-for-updates');
      ipcRenderer.on('update-available', () => {
        setUpdateAvailable(true);
      });
    }
  }, []);

  return (
    <div className={styles.container}>
      <div css={`display: flex;`}>
        <div className={styles.logoText}>
          <img src={logo} height="40px" alt="logo" draggable="false" />
        </div>
        <HorizontalMenu location={props.location} />
      </div>
      <Link
        to={{
          pathname: '/settings/myAccount_Preferences',
          state: { modal: true }
        }}
        css={`margin-right: ${theme.spacing(3)}px;`}
      >
        <FontAwesomeIcon icon={faCog} className={styles.settings} />
      </Link>
      {updateAvailable && (
        <div className={styles.updateAvailable}>
          <Link to="/autoUpdate">
            <Button type="primary" size="small" style={{ marginLeft: 5 }}>
              Update Available
            </Button>
          </Link>
        </div>
      )}
    </div>
  );
};
