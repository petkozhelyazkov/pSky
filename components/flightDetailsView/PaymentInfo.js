import styles from './PaymentInfo.module.css';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItem from '@mui/material/ListItem';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useEffect, useRef, useState } from 'react';
import { Divider } from '@mui/material';

export default function PaymentInfo({
    travelers,
    totalPrice,
    passengers
}) {
    const ref = useRef();

    useEffect(() => {
        window.addEventListener('scroll', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, []);

    function onScroll() {
        let elem = ref.current;

        if (window.scrollY < 130) {
            return;
        }

        elem.animate({
            marginTop: [`${window.scrollY - 140}px`]
        }, {
            duration: 700,
            iterations: 1,
        });

        elem.style.marginTop = `${window.scrollY - 140}px`;
    }

    const [open, setOpen] = useState(false);
    const [open1, setOpen1] = useState(false);

    let travelersByType = [
        { type: 'ADULT', count: 0, name: 'Възрастни', sum: 0 },
        { type: 'YOUNG', count: 0, name: 'Младежи', sum: 0 },
        { type: 'CHILD', count: 0, name: 'Деца', sum: 0 },
        { type: 'SEATED_INFANT', count: 0, name: 'Бебета', sum: 0 }
    ];

    let adultPrice = 0;

    travelers.forEach(x => {
        if (x.travelerType == 'ADULT') {
            travelersByType[0].count++;
            travelersByType[0].sum += Number(x.price.total);
            adultPrice = x.price.total;
        }
        if (x.travelerType == 'CHILD') {
            travelersByType[2].count++;
            travelersByType[2].sum += Number(x.price.total);
        } if (x.travelerType == 'SEATED_INFANT') {
            travelersByType[3].count++
            travelersByType[3].sum += Number(x.price.total);
        }
    });

    travelersByType[1].count = passengers.young;
    travelersByType[1].sum = passengers.young * adultPrice;

    travelersByType[0].count -= passengers.young;
    travelersByType[0].sum -= (passengers.young * adultPrice);
    travelersByType[0].sum = travelersByType[0].sum.toFixed(2);

    const handleClick = (index) => {
        if (index == 0) {
            return () => {
                setOpen(!open);
            }
        }
        if (index == 1) {
            return () => {
                setOpen1(!open1);
            }
        }
    };

    return (
        <div ref={ref} className={styles.paymentInfoWrapper}>
            <List
                sx={{ width: '100%', bgcolor: 'white' }}
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                <ListItemButton onClick={handleClick(0)}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                    <div style={{ display: 'inline-block', width: '100%', fontSize: '14px' }}>
                        <span style={{ float: 'left' }}>Пътници({travelers.length})</span>
                        <span style={{ fontWeight: '600', float: 'right' }}>{parseFloat(totalPrice).toFixed(2)} BGN</span>
                    </div>
                </ListItemButton>
                <Collapse in={open} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {travelersByType.map((x, i) =>
                            <div key={i}>
                                {
                                    x.count > 0 &&
                                    <div>
                                        <ListItem sx={{ pl: 5 }} style={{ lineHeight: '10px' }}>
                                            <div style={{ display: 'inline-block', width: '100%', fontSize: '14px', color: 'gray' }}>
                                                <span style={{ float: 'left' }}>{`${x.name}(${x.count})`}</span>
                                                <span style={{ fontWeight: '600', float: 'right' }}>{x.sum} BGN</span>
                                            </div>
                                        </ListItem>
                                    </div>}
                            </div>)}
                    </List>
                </Collapse>
                <Divider />
                <ListItemButton onClick={handleClick(1)}>
                    {open1 ? <ExpandLess /> : <ExpandMore />}
                    <div style={{ display: 'inline-block', width: '100%', fontSize: '14px' }}>
                        <span style={{ float: 'left' }}>Такси</span>
                        <span style={{ fontWeight: '600', float: 'right' }}>66.01 BGN</span>
                    </div>
                </ListItemButton>
                <Collapse in={open1} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        <ListItem sx={{ pl: 5 }} style={{ lineHeight: '10px' }}>
                            <div style={{ display: 'inline-block', width: '100%', fontSize: '14px', color: 'gray' }}>
                                <span style={{ float: 'left' }}>Такса за обслужване:</span>
                                <span style={{ fontWeight: '600', float: 'right' }}>18.84 BGN</span>
                            </div>
                        </ListItem>
                        <ListItem sx={{ pl: 5 }} style={{ lineHeight: '5px' }}>
                            <div style={{ display: 'inline-block', width: '100%', fontSize: '14px', color: 'gray' }}>
                                <span style={{ float: 'left' }}>Летищни такси</span>
                                <span style={{ fontWeight: '600', float: 'right' }}>47.17 BGN</span>
                            </div>
                        </ListItem>
                    </List>
                </Collapse>
                <Divider />
                <ListItem>
                    <div style={{ width: '100%', lineHeight: '20px' }}>
                        <div style={{ display: 'inline-block', width: '100%' }}>
                            <span style={{ fontSize: '22px', fontWeight: '600', float: 'left' }}>Общо:</span>
                            <span style={{ fontSize: '22px', fontWeight: '600', float: 'right' }}>{Number(totalPrice) + Number(66.01)} BGN</span>
                        </div>
                        <div>
                            <span style={{ fontSize: '12px', color: 'gray' }}>вкючени всички такси</span>
                        </div>
                    </div>
                </ListItem>
            </List>
        </div>
    )
}