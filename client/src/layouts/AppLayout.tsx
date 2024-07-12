import { useDisclosure } from '@mantine/hooks';
import { AppShell, Avatar, Burger, Button, Group, Menu, rem, Text, UnstyledButton, useComputedColorScheme, useMantineColorScheme } from '@mantine/core';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { IconMoon2, IconSettings, IconTrash } from '@tabler/icons-react';
import { notifications } from '@mantine/notifications';

type Props = {}

export default function AppLayout({ }: Props) {
    const [opened, { toggle }] = useDisclosure();
    const navigate = useNavigate();
    const location = useLocation();
    const { setColorScheme } = useMantineColorScheme();
    const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });

    const isActive = (path: string) => location.pathname === path;


    const handleLogoutRequest = async () => {
        try {
            const res = await fetch("http://localhost:1234/api/v1/auth/logout", {
                method: "POST",
                credentials: 'include',
            });
            if (res.status === 200) {
                notifications.show({
                    title: 'Başarılı',
                    message: 'Çıkış yapılıyor...',
                    autoClose: 1500
                });
                setTimeout(() => {
                    navigate("/sign-in")
                }, 1500)
            }
        } catch (error) {
            throw error;
        }
    }

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
                            <Text c="blue" size="xl">Ganzo</Text>
                            <Group ml="xl" gap={0} visibleFrom="sm">
                                <UnstyledButton
                                    style={{
                                        textDecoration: isActive("/app") ? "underline" : "none"
                                    }}
                                    c="blue" component={Link} to="/app" px="md">Home</UnstyledButton>
                                <UnstyledButton c="blue" px="md">Blog</UnstyledButton>
                                <UnstyledButton c="blue" px="md">Contacts</UnstyledButton>
                                <UnstyledButton c="blue" px="md">Support</UnstyledButton>



                                <Menu shadow="md" width={200}>
                                    <Menu.Target>
                                        <Avatar style={{ cursor: "pointer" }} color="cyan" radius="xl" mx="xs" ml="md" >MK</Avatar>
                                    </Menu.Target>

                                    <Menu.Dropdown>
                                        <Menu.Label>Application</Menu.Label>
                                        <Menu.Item to="settings" component={Link} leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                                            Settings
                                        </Menu.Item>
                                        <Menu.Item onClick={() => setColorScheme(computedColorScheme === 'light' ? 'dark' : 'light')}
                                            leftSection={<IconMoon2 style={{ width: rem(14), height: rem(14) }} />}>
                                            Mod Değiştir
                                        </Menu.Item>
                                        <Menu.Divider />
                                        <Menu.Item
                                            onClick={handleLogoutRequest}
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

                <AppShell.Navbar py="md">
                    <Button
                        to="/app"
                        component={Link}
                        variant="transparent"
                        style={{
                            textDecoration: isActive("/app") ? "underline" : "none"
                        }}
                    >
                        Home
                    </Button>
                    <Button variant="transparent" mt="xs">Blog</Button>
                    <Button variant="transparent" mt="xs">Contacts</Button>
                    <Button variant="transparent" mt="xs">Support</Button>

                </AppShell.Navbar>

                <AppShell.Main>
                    <Outlet />
                </AppShell.Main>
            </AppShell>
        </div>
    )
}