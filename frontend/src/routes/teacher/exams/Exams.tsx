import * as React from "react";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import Chip from "@mui/joy/Chip";
import { Stack } from "@mui/joy";

const ActionButtons: React.FC = () => (
  <Stack direction="row" spacing={1}>
    <Button>Modifica</Button>
    <Button>Sessioni </Button>
  </Stack>
);

export const Exams: React.FC = () => {
  return (
    <>
      <Typography level="h1">Esami</Typography>
      <Button style={{ float: "right" }}>Aggiungi esame</Button>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th style={{ width: "40%" }}>Titolo</th>
            <th>Classi</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <Chip>Node</Chip>
            </td>
            <td>
              <Chip>Cookie</Chip>
            </td>
            <td>
              <ActionButtons />
            </td>
          </tr>
          <tr>
            <td>
              <Chip>Docker</Chip>
            </td>
            <td>
              <Chip>Cookie</Chip>
              <Chip>Suze</Chip>
            </td>
            <td>
              <ActionButtons />
            </td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};
