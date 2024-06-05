import { useContext, useState } from 'react';
import { UserContext } from '../../contexts/userContext';
import styles from './Passengers.module.css';
import { Modal } from '@mui/material';
import moment from 'moment';

export default function Passengers() {
    const { user } = useContext(UserContext);
    const { passengers } = user;
    const [modal, setModal] = useState(false);
    const [deleteModal, setDeleteModal] = useState(false);
    const [passengerId, setPassengerId] = useState();

    function onOpenModal() {
        setModal(true);
    }

    function onCloseModal() {
        setModal(false);
    }

    function onOpenDeleteModal(id) {
        return () => {
            setDeleteModal(true);
            setPassengerId(id);
        }
    }

    function onCloseDeleteModal() {
        setDeleteModal(false);
    }

    return (
        <div className={styles.wrapper}>
            <CustomModal modal={modal} onCloseModal={onCloseModal} />
            <DeleteModal modal={deleteModal} onCloseModal={onCloseDeleteModal} passengerId={passengerId} />
            <h1>Пътници</h1>
            <p>Добави данни за хората, с които пътуваш често, за да се заредят автоматично при резервацията ти.
                Така ще си спестиш време и ще избегнеш грешки при попълването на данни.</p>
            <div className={styles.passengersWrapper}>
                {passengers.map((x, i) =>
                    <div className={styles.passengerWrapper} key={i}>
                        <div>
                            <span className={styles.passengerName}>{x.firstName} {x.lastName} ({x.gender})</span>
                            <Label label='Дата на раждане' data={`${x.day}.${x.month}.${x.year}`} />
                        </div>
                        <button className={styles.passengerButton} onClick={onOpenDeleteModal(x.id)}>Изтрий</button>
                    </div>
                )}
            </div>
            <div className={styles.box}>
                <div className={styles.header}>
                    {passengers?.lenght > 0
                        ? <span>Добави друг пътник</span>
                        : <span>Все още нямаш добавени пътници.</span>
                    }
                    <p>и спести време от попълване на същите данни след това.</p>
                </div>
                <button onClick={onOpenModal}>Добави</button>
            </div>
        </div>
    );
}

function DeleteModal({
    modal,
    onCloseModal,
    passengerId
}) {
    const { userReducer } = useContext(UserContext);

    function onSubmit(e) {
        e.preventDefault();

        userReducer(passengerId, 'REMOVE_PASSENGER');
        onCloseModal();
    }

    return (
        <Modal open={modal} onClose={onCloseModal}>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h3>Наистина ли искаш да изтриеш данните за пътника?</h3>
                        <p>Ако премахнеш пътника, <span style={{ color: 'rgb(218, 76, 115)' }}>запазените за него данни ще бъдат изтрити.</span> Ще се наложи да ги въведеш повторно, ако пътувате отново заедно.</p>
                    </div>
                    <form onSubmit={onSubmit} method='post'>
                        <div className={styles.buttons}>
                            <button onClick={onCloseModal} className={styles.back}>Назад</button>
                            <button type='submit' style={{ backgroundColor: 'rgb(218, 76, 115)', borderColor: 'rgb(218, 76, 115)' }} className={styles.save}>Изтрий</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}

function CustomModal({
    modal,
    onCloseModal,
}) {
    const { userReducer } = useContext(UserContext);

    function onSubmit(e) {
        e.preventDefault();
        const { firstName, lastName, day, month, year, gender } = Object.fromEntries(new FormData(e.target));
        var age = moment().diff(`${year}-${month}-${day}`, 'years', false);

        let newPassenger = {
            firstName,
            lastName,
            day,
            month,
            year,
            age,
            gender
        }

        userReducer(newPassenger, 'ADD_PASSENGER');
        onCloseModal();
    }

    return (
        <Modal open={modal} onClose={onCloseModal}>
            <div className={styles.modalWrapper}>
                <div className={styles.modal}>
                    <div className={styles.modalHeader}>
                        <h3>Добави пътник</h3>
                        <p>Добави данни за пътника, така че да спестиш време и усилия при попълването на информацията по време на резервация.</p>
                    </div>
                    <form onSubmit={onSubmit} method='post'>
                        <div className={styles.modalContent}>
                            <div className={styles.inputLabel}>
                                <label htmlFor="email">Име:</label>
                                <input type="text" id='firstName' name='firstName' />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="number">Фамилия:</label>
                                <input type="text" id='lastName' name='lastName' />
                            </div>
                            <div className={styles.inputLabel}>
                                <label htmlFor="number">Пол:</label>
                                <select name="gender" defaultValue='choose' id="gender">
                                    <option style={{ display: 'none' }} value="choose">Избери</option>
                                    <option value="мъж">Мъж</option>
                                    <option value="жена">Жена</option>
                                    <option value="друг">Друг</option>
                                </select>
                            </div>
                            <div className={styles.dateInput}>
                                <label htmlFor="number">Дата на раждане:</label>
                                <select name="day" id="day">
                                    <DayOptions />
                                </select>
                                <select name="month" id="month">
                                    <MonthOptions />
                                </select>
                                <select name="year" id="year">
                                    <YearOptions />
                                </select>
                            </div>
                        </div>
                        <div className={styles.buttons}>
                            <button onClick={onCloseModal} className={styles.back}>Назад</button>
                            <button type='submit' className={styles.save}>Запази</button>
                        </div>
                    </form>
                </div>
            </div>
        </Modal >
    )
}

function Label({
    label,
    data
}) {
    return (
        <div className={styles.labelWrapper}>
            <div className={styles.label}>
                <p>{label}</p>
                <span>{data}</span>
            </div>
        </div>
    )
}

function DayOptions() {
    return (
        <>
            <option value="01">1</option>
            <option value="02">2</option>
            <option value="03">3</option>
            <option value="04">4</option>
            <option value="05">5</option>
            <option value="06">6</option>
            <option value="07">7</option>
            <option value="08">8</option>
            <option value="09">9</option>
            <option value="10">10</option>
            <option value="11">11</option>
            <option value="12">12</option>
            <option value="13">13</option>
            <option value="14">14</option>
            <option value="15">15</option>
            <option value="16">16</option>
            <option value="17">17</option>
            <option value="18">18</option>
            <option value="19">19</option>
            <option value="20">20</option>
            <option value="21">21</option>
            <option value="22">22</option>
            <option value="23">23</option>
            <option value="24">24</option>
            <option value="25">25</option>
            <option value="26">26</option>
            <option value="27">27</option>
            <option value="28">28</option>
            <option value="29">29</option>
            <option value="30">30</option>
            <option value="31">31</option>
        </>
    )
}

function MonthOptions() {
    return (
        <>
            <option value="01">яну</option>
            <option value="02">фев</option>
            <option value="03">март</option>
            <option value="04">апр</option>
            <option value="05">май</option>
            <option value="06">юни</option>
            <option value="07">юли</option>
            <option value="08">авг</option>
            <option value="009">сеп</option>
            <option value="10">окт</option>
            <option value="11">ное</option>
            <option value="12">дек</option>
        </>
    )
}

function YearOptions() {
    return (
        <>
            <option value="2022">2022</option>
            <option value="2021">2021</option>
            <option value="2020">2020</option>
            <option value="2019">2019</option>
            <option value="2018">2018</option>
            <option value="2017">2017</option>
            <option value="2016">2016</option>
            <option value="2015">2015</option>
            <option value="2014">2014</option>
            <option value="2013">2013</option>
            <option value="2012">2012</option>
            <option value="2011">2011</option>
            <option value="2010">2010</option>
            <option value="2009">2009</option>
            <option value="2008">2008</option>
            <option value="2007">2007</option>
            <option value="2006">2006</option>
            <option value="2005">2005</option>
            <option value="2004">2004</option>
            <option value="2003">2003</option>
            <option value="2002">2002</option>
            <option value="2001">2001</option>
            <option value="2000">2000</option>
            <option value="1999">1999</option>
            <option value="1998">1998</option>
            <option value="1997">1997</option>
            <option value="1996">1996</option>
            <option value="1995">1995</option>
            <option value="1994">1994</option>
            <option value="1993">1993</option>
            <option value="1992">1992</option>
            <option value="1991">1991</option>
            <option value="1990">1990</option>
            <option value="1989">1989</option>
            <option value="1988">1988</option>
            <option value="1987">1987</option>
            <option value="1986">1986</option>
            <option value="1985">1985</option>
            <option value="1984">1984</option>
            <option value="1983">1983</option>
            <option value="1982">1982</option>
            <option value="1981">1981</option>
            <option value="1980">1980</option>
            <option value="1979">1979</option>
            <option value="1978">1978</option>
            <option value="1977">1977</option>
            <option value="1976">1976</option>
            <option value="1975">1975</option>
            <option value="1974">1974</option>
            <option value="1973">1973</option>
            <option value="1972">1972</option>
            <option value="1971">1971</option>
            <option value="1970">1970</option>
            <option value="1969">1969</option>
            <option value="1968">1968</option>
            <option value="1967">1967</option>
            <option value="1966">1966</option>
            <option value="1965">1965</option>
            <option value="1964">1964</option>
            <option value="1963">1963</option>
            <option value="1962">1962</option>
            <option value="1961">1961</option>
            <option value="1960">1960</option>
            <option value="1959">1959</option>
            <option value="1958">1958</option>
            <option value="1957">1957</option>
            <option value="1956">1956</option>
            <option value="1955">1955</option>
            <option value="1954">1954</option>
            <option value="1953">1953</option>
            <option value="1952">1952</option>
            <option value="1951">1951</option>
            <option value="1950">1950</option>
            <option value="1949">1949</option>
            <option value="1948">1948</option>
            <option value="1947">1947</option>
            <option value="1946">1946</option>
            <option value="1945">1945</option>
            <option value="1944">1944</option>
            <option value="1943">1943</option>
            <option value="1942">1942</option>
            <option value="1941">1941</option>
            <option value="1940">1940</option>
            <option value="1939">1939</option>
            <option value="1938">1938</option>
            <option value="1937">1937</option>
            <option value="1936">1936</option>
            <option value="1935">1935</option>
            <option value="1934">1934</option>
            <option value="1933">1933</option>
            <option value="1932">1932</option>
            <option value="1931">1931</option>
            <option value="1930">1930</option>
            <option value="1929">1929</option>
            <option value="1928">1928</option>
            <option value="1927">1927</option>
            <option value="1926">1926</option>
            <option value="1925">1925</option>
            <option value="1924">1924</option>
            <option value="1923">1923</option>
        </>
    )
}