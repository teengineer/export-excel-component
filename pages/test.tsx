import _ from 'lodash'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useMemo, useState, useEffect } from 'react'
import DataTable from 'react-data-table-component'
import ExportExcel from './components/export-excel'
import styles from "../styles/Home.module.css";
import ExcelExports from 'export-excel-component'

export default function Home() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState('')

    const columns = [
        {
            id: 1,
            name: "Baslik",//locale(tr) title
            selector: (row) => row.title,
            sortable: true,
            reorder: true,
            sortField: 'title',
        },
        {
            id: 2,
            name: "Yonetmen",//locale(tr) title
            selector: (row) => row.director,
            sortable: true,
            reorder: true,
            sortField: 'director',
        },
        {
            id: 3,
            name: "Sure (m)",//locale(tr) title
            selector: (row) => row.runtime,
            sortable: true,
            right: true,
            reorder: true,
            sortField: 'runtime',
        },
    ];

    useEffect(() => {
        setData([
            {
                id: 1,
                title: "Conan the Barbarian",
                director: "John Milius",
                runtime: 115,
            },
            {
                id: 2,
                title: "Conan the Destroyer",
                director: "Richard Fleischer",
                runtime: 97,
            },
            {
                id: 3,
                title: "Conan the Barbarian",
                director: "John Milius",
                runtime: 115,
            },
            {
                id: 4,
                title: "Conan the Destroyer",
                director: "Richard Fleischer",
                runtime: 97,
            },
            {
                id: 5,
                title: "Conan the Barbarian",
                director: "John Milius",
                runtime: 115,
            },
        ]);
    }, []);

    return (
        <div className={styles.container}>
            <main style={{ marginTop: '20px' }}>
                <ExportExcel
                    columns={columns}
                    data={data?.filter(r => {
                        if (query === '') return true
                        const fields = _.pick(r, ['title', 'director', 'runtime', '']) as any[]
                        return Object.values(fields)
                            .join(' ')
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    })
                    }
                    pageName="SatisHareketleri"
                ></ExportExcel>
                {/* <ExcelExports 
                columns={columns}
                    data={data?.filter(r => {
                        if (query === '') return true
                        const fields = _.pick(r, ['title', 'director', 'runtime', '']) as any[]
                        return Object.values(fields)
                            .join(' ')
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    })
                    }
                    pageName="SatisHareketleri"
                    ></ExcelExports> */}
                <ExcelExports.ExportExcel
                    columns={columns}
                    data={data?.filter(r => {
                        if (query === '') return true
                        const fields = _.pick(r, ['title', 'director', 'runtime', '']) as any[]
                        return Object.values(fields)
                            .join(' ')
                            .toLowerCase()
                            .includes(query.toLowerCase())
                    })
                    }
                    pageName="SatisHareketleri"></ExcelExports.ExportExcel>
                <DataTable columns={columns} data={data} pagination />

            </main>
            <footer className={styles.footer}></footer>
        </div>
    );
}
