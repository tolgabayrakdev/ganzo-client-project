import { useDisclosure } from '@mantine/hooks';
import { AppShell, Avatar, Burger, Group, Menu, rem, UnstyledButton } from '@mantine/core';
import { Outlet } from 'react-router-dom';
import { IconSettings, IconTrash } from '@tabler/icons-react';

type Props = {}

export default function AppLayout({ }: Props) {
    const [opened, { toggle }] = useDisclosure();

    return (
        <div>
            <AppShell
                header={{ height: 60 }}
                navbar={{ width: 300, breakpoint: 'sm', collapsed: { desktop: true, mobile: !opened } }}
                padding="md"
            >
                <AppShell.Header>
                    <Group h="100%" px="md">
                        <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                        <Group justify="space-between" style={{ flex: 1 }}>
                            <p>Logo</p>
                            <Group ml="xl" gap={0} visibleFrom="sm">
                                <UnstyledButton px="md">Home</UnstyledButton>
                                <UnstyledButton px="md">Blog</UnstyledButton>
                                <UnstyledButton px="md">Contacts</UnstyledButton>
                                <UnstyledButton px="md">Support</UnstyledButton>



                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <Avatar color="cyan" radius="xl" mx="xs" ml="md" >MK</Avatar>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Label>Application</Menu.Label>
                                        <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                            Settings
                                        </Menu.Item>


                                        <Menu.Divider />


                                        <Menu.Item
                                            color="red"
                                            leftSection={<IconTrash style={{ width: rem(14), height: rem(14) }} />}
                                        >
                                            Çıkış Yap
                                        </Menu.Item>
                                    </Menu.Dropdown>
                                </Menu>


                            </Group>
                        </Group>
                    </Group>
                </AppShell.Header>

                <AppShell.Navbar py="md" px={4}>
                    <UnstyledButton>Home</UnstyledButton>
                    <UnstyledButton>Blog</UnstyledButton>
                    <UnstyledButton>Contacts</UnstyledButton>
                    <UnstyledButton>Support</UnstyledButton>

                </AppShell.Navbar>

                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </div>
    )
}