import { useEffect, useState } from 'react';
import { Table, TextInput, ScrollArea, Modal, Button, Group, Select, Pagination, Checkbox, Popover, Text, Drawer, Flex } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { useDisclosure } from '@mantine/hooks';
import { IconPlus } from '@tabler/icons-react';
import { useForm } from '@mantine/form';

function CustomerTable() {
  const [opened, { open, close }] = useDisclosure(false);
  const [loading, setLoading] = useState(false);
  const [personList, setPersonList] = useState<any>([]);
  const [deletePopoverId, setDeletePopoverId] = useState<string | null>(null);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      name: '',
      surname: '',
      email: '',
      phone_number: '',
      description: ''
    },
    validate: {
      name: (value) => value.length < 3 ? "En az üç karakter olmalıdır" : null,
      surname: (value) => value.length < 3 ? "En az üç karakter olmalıdır" : null,
      email: (value) => (/^\S+@\S+$/.test(value) ? null : 'Geçersiz email'),
      phone_number: (value) => value.length < 11 ? "Telefon numarası en az 11 karakter olmalıdır" : null
    }
  });

  //--------------------------------------------
  const [search, setSearch] = useState('');
  const [selectedData, setSelectedData] = useState<any>(null);
  const [modalOpened, setModalOpened] = useState(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState(5);
  const [selectedRows, setSelectedRows] = useState<any>([]);



  const getPersonList = async () => {
    try {
      const res = await fetch("http://localhost:1234/api/v1/persons", {
        method: "GET",
        credentials: "include"
      });
      const data = await res.json();
      setPersonList(data.persons);
      console.log(data);

    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getPersonList();
  }, [])


  const filteredData = personList?.filter((item: any) => {
    const searchTerm = search.toLowerCase();
    const fullName = `${item.name.toLowerCase()} ${item.surname.toLowerCase()}`;
    return (
      fullName.includes(searchTerm) ||
      item.email.toString().includes(searchTerm) ||
      item.phone_number.toString().includes(searchTerm)
    );
  });

  const handleEdit = (item: any) => {
    setSelectedData(item);
    setModalOpened(true);
  };

  const handleDelete = async (id: any) => {
    try {
      const res = await fetch(`http://localhost:1234/api/v1/persons/${id}`, {
        method: "DELETE",
        credentials: "include"
      });
      if (res.ok) {
        setPersonList(personList.filter((item: any) => item.id !== id));
        notifications.show({
          title: 'İşlem Başarılı',
          message: 'Kişi başarıyla silindi',
          autoClose: 1500,
          color: "green"
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handlePersonCreateForm = async (values: any) => {
    const processedValues = {
      name: values.name,
      surname: values.surname,
      email: values.email,
      phone_number: values.phone_number,
      description: values.description === '' ? null : values.description,
    };

    setLoading(true)
    try {
      const res = await fetch("http://localhost:1234/api/v1/persons", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(processedValues),
      });
      if (res.status === 201) {
        setTimeout(() => {
          setLoading(false);
          notifications.show({
            title: 'İşlem Başarılı',
            message: 'Kişi başarıyla eklendi',
            autoClose: 1500,
            color: "green"
          });
          close();
          getPersonList();
        }, 1500)
      }
    } catch (error) {
      throw error;
    }
  }

  const handleUpdate = async () => {
    setPersonList(personList.map((item: any) => (item.id === selectedData.id ? selectedData : item)));
    console.log('Updated data:', selectedData);
    try {
      const res = await fetch(`http://localhost:1234/api/v1/persons/${selectedData.id}`, {
        method: "PUT",
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(selectedData)
      });
      if (res.ok) {
        setModalOpened(false);
        notifications.show({
          title: 'İşlem Başarılı',
          message: 'Kişi başarıyla güncellendi',
          autoClose: 1500,
          color: "green"
        });
      }
    } catch (error) {
      throw error;
    }
  };

  const handleChange = (field: any, value: any) => {
    setSelectedData({ ...selectedData, [field]: value });
  };

  const handlePageChange = (newPage: any) => {
    setPage(newPage);
  };

  const handlePageSizeChange = (newPageSize: any) => {
    setPageSize(newPageSize);
    setPage(1); // Sayfa boyutu değiştiğinde sayfayı 1'e sıfırla
  };

  const handleExportCSV = () => {
    const csvData = [
      ["Ad", "Soyad", "Email", "Telefon No", "Şirket", "Açıklama"],
      ...filteredData.map((item: { name: string; surname: string; email: string; phone_number: string; company: any; description: string; }) => [item.name, item.surname, item.email, item.phone_number, item.company, item.description])
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + csvData.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link); // Required for FF

    link.click();
    document.body.removeChild(link);
  };


  const paginatedData = filteredData?.slice((page - 1) * pageSize, page * pageSize);

  const handleSelectRow = (id: any) => {
    if (selectedRows.includes(id)) {
      setSelectedRows(selectedRows.filter((rowId: any) => rowId !== id));
    } else {
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleDeleteSelected = () => {
    setPersonList(personList.filter((item: any) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };


  const openDeletePopover = (id: any) => {
    setDeletePopoverId(id);
  }

  const closeDeletePopover = () => {
    setDeletePopoverId(null);
  }

  const confirmDelete = () => {
    if (deletePopoverId) {
      handleDelete(deletePopoverId);
      closeDeletePopover();
    }
  }

  return (
    <div>
      <Flex justify="space-between">
        <TextInput
          w="230"
          placeholder="Ara..."
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          mb="md"
        />
        <Button color="green" leftSection={<IconPlus />} onClick={open}>Yeni</Button>

      </Flex>

      <ScrollArea style={{ height: pageSize > 20 ? '600px' : 'auto' }}>
        <Table striped highlightOnHover verticalSpacing="md">
          <Table.Thead>
            <Table.Tr>
              <Table.Th></Table.Th>
              <Table.Th>İsim</Table.Th>
              <Table.Th>Email</Table.Th>
              <Table.Th>Telefon No</Table.Th>
              <Table.Th>İşlemler</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {
              paginatedData?.length > 0 ? (
                paginatedData.map((item: any) => (
                  <Table.Tr key={item.id}>
                    <Table.Td>
                      <Checkbox
                        checked={selectedRows.includes(item.id)}
                        onChange={() => handleSelectRow(item.id)}
                      />
                    </Table.Td>
                    <Table.Td>{item.name} {item.surname}</Table.Td>
                    <Table.Td>{item.email}</Table.Td>
                    <Table.Td>{item.phone_number}</Table.Td>
                    <Table.Td>
                      <Group>
                        <Button onClick={() => handleEdit(item)} size="xs">Güncelle</Button>
                        <Popover
                          opened={deletePopoverId === item.id}
                          onClose={closeDeletePopover}
                          width={200}
                          position="bottom"
                          withArrow
                          shadow="md"
                        >
                          <Popover.Target>
                            <Button onClick={() => openDeletePopover(item.id)} size="xs" color="red">Sil</Button>
                          </Popover.Target>
                          <Popover.Dropdown>
                            <Text mb="xs" size="xs">Silme işlemini yapmak istiyor musunuz?</Text>
                            <Button size="compact-md" onClick={confirmDelete}>Onayla</Button>
                          </Popover.Dropdown>
                        </Popover>
                      </Group>
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td style={{ textAlign: 'center' }}>
                    Sonuç Yok
                  </Table.Td>
                </Table.Tr>
              )
            }
          </Table.Tbody>
        </Table>
      </ScrollArea>

      <Group mt="md">
        <Select
          value={pageSize.toString()}
          onChange={(value: any) => handlePageSizeChange(parseInt(value))}
          data={[
            { value: '5', label: '5' },
            { value: '25', label: '25' },
            { value: '50', label: '50' },
          ]}
        />
        <Pagination
          value={page}
          onChange={handlePageChange}
          total={Math.ceil(filteredData?.length / pageSize)}
        />
      </Group>

      <Group mt="md">
        <Button onClick={handleExportCSV}>CSV Olarak İndir</Button>
        <Button onClick={handleDeleteSelected} color="red" disabled={selectedRows.length === 0}>
          Seçili Olanları Sil
        </Button>
      </Group>


      <Modal
        opened={modalOpened}
        onClose={() => setModalOpened(false)}
        title="Veriyi Güncelle"
      >
        {selectedData && (
          <div>
            <TextInput
              label="İsim"
              value={selectedData.name}
              onChange={(event) => handleChange('name', event.currentTarget.value)}
              mb="sm"
            />
            <TextInput
              label="İsim"
              value={selectedData.surname}
              onChange={(event) => handleChange('surname', event.currentTarget.value)}
              mb="sm"
            />
            <TextInput
              label="Email"
              value={selectedData.email}
              onChange={(event) => handleChange('email', event.currentTarget.value)}
              mb="sm"
            />
            <TextInput
              label="Telefon No"
              value={selectedData.phone_number}
              onChange={(event) => handleChange('phone_number', event.currentTarget.value)}
              mb="sm"
            />
            <Button onClick={handleUpdate}>Güncelle</Button>
          </div>
        )}
      </Modal>

      <Drawer position="right" opened={opened} onClose={close} title="Yeni kişi ekle">
        <form onSubmit={form.onSubmit((values) => handlePersonCreateForm(values))}>
          <TextInput
            mb="xs"
            label="Ad"
            placeholder="Ad"
            key={form.key("name")}
            {...form.getInputProps("name")}
          />
          <TextInput
            mb="xs"
            label="Soyad"
            placeholder="Soyad"
            key={form.key("surname")}
            {...form.getInputProps("surname")}
          />
          <TextInput
            mb="xs"
            label="Email"
            placeholder="Email"
            key={form.key("email")}
            {...form.getInputProps("email")}
          />
          <TextInput
            mb="xs"
            label="Telefon No"
            placeholder="Telefon No"
            key={form.key("phone_number")}
            {...form.getInputProps("phone_number")}
          />
          <TextInput
            mb="xs"
            label="Açıklama"
            placeholder="Açıklama"
            key={form.key("description")}
            {...form.getInputProps("description")}
          />
          <Button loading={loading} type="submit" fullWidth mt="md">
            Kaydet
          </Button>
        </form>
      </Drawer>

    </div>
  );
}

export default CustomerTable;