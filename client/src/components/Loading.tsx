import { Flex, Loader } from "@mantine/core"

type Props = {}

export default function Loading({ }: Props) {
  return (
    <Flex h="100vh" justify="center" align="center" direction="column">
      <Loader color="blue" />
    </Flex>
  )
}