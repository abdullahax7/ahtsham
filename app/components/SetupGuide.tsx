'use client';

import React, { useState } from 'react';

interface SetupGuideProps {
  type: string;
}

const setupData: Record<string, { title: string; description: string; glowColor: string }> = {
  cpanel: {
    title: 'How to Setup cPanel/WHM License?',
    glowColor: 'rgba(248, 87, 39, 0.4)',
    description: 'To install and activate your cPanel/WHM license, simply run our automated activation script via SSH as the root user. Once the script completes, your license will be instantly active and ready to use. You can refresh the license status at any time using the standard cPanel key control command.'
  },
  plesk: {
    title: 'How to Setup Plesk License?',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    description: 'Activating your Plesk license is a seamless process. Run our specialized licensing client script on your server, and it will automatically configure and activate your panel. No manual license keys are required as our system identifies your server IP.'
  },
  litespeed: {
    title: 'How to Setup LiteSpeed License?',
    glowColor: 'rgba(16, 185, 129, 0.4)',
    description: 'Unlock the full power of LiteSpeed Enterprise by running our one-line activation command. The script handles the registration with our licensing servers and configures your LiteSpeed instance to recognize the new license immediately.'
  },
  cloudlinux: {
    title: 'How to Setup CloudLinux License?',
    glowColor: 'rgba(100, 116, 139, 0.4)',
    description: 'Registering your server with CloudLinux is straightforward. Execute our registration script, and your server will be instantly connected to our licensing network, enabling all CloudLinux features without a reboot.'
  },
  imunify360: {
    title: 'How to Setup Imunify360 License?',
    glowColor: 'rgba(79, 70, 229, 0.4)',
    description: 'Protect your server with Imunify360 by running our automated installer. The script will handle both the software installation and the license activation, ensuring your server is secured in minutes.'
  },
  cpguard: {
    title: 'How to Setup cpGuard License?',
    glowColor: 'rgba(34, 197, 94, 0.4)',
    description: 'Install and activate cpGuard on your cPanel server using our simplified setup script. It will automatically detect your environment and apply the license proxy settings for continuous protection.'
  },
  osm: {
    title: 'How to Setup OSM?',
    glowColor: 'rgba(56, 189, 248, 0.4)',
    description: 'Enable Optimized Server Management on your system by installing our lightweight management agent. Once installed, our team can begin optimizing your server performance and monitoring its health.'
  },
  virtualizor: {
    title: 'How to Setup Virtualizor License?',
    glowColor: 'rgba(139, 92, 246, 0.4)',
    description: 'Activate your Virtualizor VPS panel by running our activation command as root. The system will synchronize with our licensing servers and enable all premium features on your master node.'
  },
  jetbackup: {
    title: 'How to Setup JetBackup License?',
    glowColor: 'rgba(99, 102, 241, 0.4)',
    description: 'Get your JetBackup Enterprise license running by executing our activation script. It seamlessly integrates with your existing JetBackup installation to provide unlimited backup capabilities.'
  },
  softaculous: {
    title: 'How to Setup Softaculous License?',
    glowColor: 'rgba(236, 72, 153, 0.4)',
    description: 'Enable the Softaculous auto-installer on your control panel with our quick activation command. This will grant you access to hundreds of applications that can be installed with a single click.'
  },
  sitepad: {
    title: 'How to Setup SitePad License?',
    glowColor: 'rgba(244, 63, 94, 0.4)',
    description: 'Activate SitePad Website Builder on your server to give your clients access to a powerful drag-and-drop editor. Simply run our activation script to enable the premium builder features.'
  },
  whmsonic: {
    title: 'How to Setup WHMSonic License?',
    glowColor: 'rgba(239, 68, 68, 0.4)',
    description: 'Start your Shoutcast hosting business by activating WHMSonic with our automated script. It configures the plugin to work with our licensing proxy for a stable and cost-effective solution.'
  },
  dareseller: {
    title: 'How to Setup DAReseller?',
    glowColor: 'rgba(245, 158, 11, 0.4)',
    description: 'Install the DAReseller module for DirectAdmin to enable advanced reseller features. Our script handles the installation and licensing, so you can start managing your resellers immediately.'
  },
  directadmin: {
    title: 'How to Setup DirectAdmin License?',
    glowColor: 'rgba(6, 182, 212, 0.4)',
    description: 'Activate your DirectAdmin license by running our specialized script as root. It works with all versions of DirectAdmin and ensures your panel remains active and eligible for updates.'
  },
  whmreseller: {
    title: 'How to Setup WHMReseller?',
    glowColor: 'rgba(59, 130, 246, 0.4)',
    description: 'Enable Master and Alpha reseller levels on your WHM server by installing WHMReseller via our activation script. It integrates perfectly with your existing WHM environment.'
  },
};

const SetupGuide: React.FC<SetupGuideProps> = ({ type }) => {
  const data = setupData[type.toLowerCase()] || setupData['cpanel'];

  return (
    <section className="setup-info-simple">
      <div className="container">
        <div className="setup-info-card">
          <div className="setup-info-glow" style={{ '--glow-color': data.glowColor } as any}></div>
          <h2 className="setup-info-title">{data.title}</h2>
          <p className="setup-info-description">{data.description}</p>
        </div>
      </div>
    </section>
  );
};

export default SetupGuide;
