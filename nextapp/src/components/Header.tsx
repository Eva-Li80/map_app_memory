"use client"
import React from 'react';
import Image from 'next/image';
import styles from './header.module.scss';

type HeaderProps = {
    title: string;
    url?: string;
};

const Header = ({ title, url }: HeaderProps) => {
    return (
        <div className={styles.header}>
            <h1>{title}</h1>
            <div className={styles['image-wrapper']}>
                {url ? (
                    <Image
                        src={url}
                        alt="profil"
                        width={110}
                        height={110}
                    />
                ) : (
                    <div className={styles['alt-text']}><p>Skapa Profil</p></div>
                )}
            </div>
        </div>
    );
};

export default Header;
