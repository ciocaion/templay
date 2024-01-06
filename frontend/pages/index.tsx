import React from 'react';
import MainButton from '../components/ui/primarybutton'; 
import SecondaryButton from '../components/ui/secondarybutton'; 
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import ArrowForwardOutlinedIcon from '@mui/icons-material/ArrowForwardOutlined';
import styles from '../styles/home.module.css';
import Link from 'next/link';


export default function Home() {
  return (
    <div style={{ display: 'flex', width: '100vw', height: '100vh', backgroundColor: '#020281', justifyContent: 'center', alignItems: 'center', padding: '0px' }}>
      {/* Left Side - Image with Padding */}
      <div style={{ width: 'calc(45%)', height: '80%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0px' }}>
        <img 
          src="./assets/gea-globe.png" 
          alt="GEA Image" 
          style={{ maxWidth: '100%', maxHeight: '100%' }} 
        />
      </div>

       <div className={styles.responsiveCard}>
       <div style={{fontSize:"24px", textAlign:"center", fontWeight:"bold"}} >
          Welcome to GEA Templay App
        </div>
        <div style={{fontSize:"18px", textAlign:"center", marginBottom:'32px'}}>
        Where simplicity meets creativity in content design
        </div>
          <div style={{ marginTop: '20px' }}>
          <Link href="/dashboard" passHref>
            <MainButton 
            icon={<VisibilityOutlinedIcon  style={{ color: '#020281' }} />}
            />
          </Link>
          </div>
        </div> 
        </div>  );  
}