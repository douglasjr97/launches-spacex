import React, { useState, useRef } from 'react';

import { DataTable, DataTableProps } from 'primereact/datatable';

import { MultiSelect } from 'primereact/multiselect';
import { Column } from 'primereact/column';
import { isAfter, isBefore } from 'date-fns';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import Swal from 'sweetalert2';
interface Rocket {
  rocket_id: string;
  rocket_name: string;
  rocket_type: string;
}

export interface Launch {
  mission_name: string;
  rocket: Rocket;
  flight_number: number;
  launch_year: number;
  launch_date_local: Date;
  launch_success: string;

  links: {
    mission_patch: string;
  };
}

interface LaunchProps extends DataTableProps {
  releases: Launch[];
  lastSave: Launch[];
  setReleases: (release: Launch[]) => void;
  setFavorites: (release: Launch[]) => void;
  isSearch: boolean;
  columns: any;
}
const MyDatable: React.FC<LaunchProps> = ({
  releases,
  setReleases,
  lastSave,
  isSearch,
  columns,
  setFavorites,
  ...rest
}: LaunchProps) => {
  const dt = useRef(null);

  const [selectedFilterLatest, setSelectedFilterLatest] = useState<any>([]);
  const [selectedFilterMission, setSelectedFilterMission] = useState<any>([]);

  const [selectDateRange, setSelectDateRange] = useState([]);

  const FilterData = (event: any) => {
    // Filtro por lançamento bem sucedido ou mal sucedido
    if (selectedFilterMission[0]) {
      console.log('Filtro por missão');
      console.log(selectedFilterMission);
      switch (selectedFilterMission[0].code) {
        case 1:
          console.log(releases[0].launch_success);
          const releaseSuccess = releases.filter(
            launch => launch.launch_success === 'Success',
          );
          setReleases(releaseSuccess);
          break;
        case 2:
          const releaseUnSuccess = releases.filter(
            launch => launch.launch_success === 'Fail',
          );
          setReleases(releaseUnSuccess);
          break;
      }
    } else {
      console.log('Filtro por missão descartado');

      if (selectDateRange[0] && selectDateRange[1]) {
        console.log('Filtro por data');
        const releasesInInterval: Launch[] = [];
        releases.map(launch => {
          console.log(selectDateRange[0]);
          console.log(selectDateRange[1]);
          if (
            isAfter(new Date(launch.launch_date_local), selectDateRange[0]) &&
            isBefore(new Date(launch.launch_date_local), selectDateRange[1])
          ) {
            releasesInInterval.push(launch);
          }
          return null;
        });

        setReleases(releasesInInterval);
      } else {
        console.log('Filtro por data descartado');
        //Filtro por Lançamento proximo ou passado
        if (selectedFilterLatest[0]) {
          console.log('Filtro por proximo');
          const currentDate = new Date();

          switch (selectedFilterLatest[0].code) {
            case 1:
              const afterReleases: Launch[] = [];
              releases.map(launch => {
                if (isAfter(currentDate, new Date(launch.launch_date_local))) {
                  afterReleases.push(launch);
                }
                return null;
              });

              setReleases(afterReleases);

              break;

            case 2:
              const beforeReleases: Launch[] = [];
              releases.map(launch => {
                if (isBefore(currentDate, new Date(launch.launch_date_local))) {
                  afterReleases.push(launch);
                }
                return null;
              });
              setReleases(beforeReleases);

              break;
          }
        } else {
          console.log('Filtro por lançamento descartado');
        }
      }
    }
  };

  const header = () => {
    const options1 = [
      { name: 'Upcoming', code: 2 },
      { name: 'Past', code: 1 },
    ];

    const options2 = [
      { name: 'Success', code: 1 },
      { name: 'Fail', code: 2 },
    ];
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <div>
          <Calendar
            id="range"
            value={selectDateRange}
            onChange={(e: any) => setSelectDateRange(e.value)}
            selectionMode="range"
            placeholder="Filter Calendar"
          />

          <MultiSelect
            value={selectedFilterMission}
            options={options2}
            optionLabel="name"
            placeholder="Success/Fail"
            showSelectAll
            onChange={e => setSelectedFilterMission(e.value)}
          />

          <MultiSelect
            value={selectedFilterLatest}
            options={options1}
            optionLabel="name"
            placeholder="Upcoming/Past"
            showSelectAll
            onChange={e => setSelectedFilterLatest(e.value)}
          />
        </div>

        <Button label="Filter" className="p-button" onClick={FilterData} />
      </div>
    );
  };

  const handleAddFavorite = (launch: Launch) => {
    const favorites = JSON.parse(
      localStorage.getItem('@spaceXFalcon:favorites') || '[]',
    );
    favorites.push(launch);
    setFavorites(favorites);
    localStorage.setItem('@spaceXFalcon:favorites', JSON.stringify(favorites));

    Swal.fire(
      `Successful ${launch.mission_name} launch favorite.`,
      '',
      'success',
    );
  };

  const actionBodyTemplate = (rowTable: Launch) => {
    return (
      <Button
        type="button"
        icon="pi pi-star"
        onClick={() => handleAddFavorite(rowTable)}
      ></Button>
    );
  };
  return (
    <div>
      <DataTable
        style={{
          marginTop: '70px',
        }}
        ref={dt}
        value={releases}
        dataKey="id"
        paginator
        rows={4}
        rowsPerPageOptions={[4, 8, 16, 32]}
        resizableColumns
        // reorderableColumns
        // reorderableRows
        // onRowReorder={this.onRowReorder}
        // onColReorder={this.onColReorder}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        // currentPageReportTemplate={`${get_word('showing')} {first} ${get_word('to').toLowerCase()} {last} ${get_word('of').toLowerCase()} {totalRecords} ${get_word('item').toLowerCase()+"s"}`}
        // globalFilter={this.state.globalFilter}
        emptyMessage="Não há dados"
        removableSort
        header={header}
        responsiveLayout="stack"
        breakpoint="550px"
        stripedRows
        sortMode="multiple"
        scrollable
        scrollHeight="flex"
        {...rest}
      >
        {columns.map((column: any) => (
          <Column
            field={column.value}
            header={column.name}
            key={column.value}
          ></Column>
        ))}
        <Column
          headerStyle={{ width: '4rem', textAlign: 'center' }}
          bodyStyle={{ textAlign: 'center', overflow: 'visible' }}
          body={actionBodyTemplate}
        />
      </DataTable>
    </div>
  );
};

export default MyDatable;
