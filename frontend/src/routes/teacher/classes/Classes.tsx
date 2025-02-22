import Button from "@mui/joy/Button";
import Stack from "@mui/joy/Stack";
import Table from "@mui/joy/Table";
import Typography from "@mui/joy/Typography";
import Pagination from "@mui/material/Pagination/Pagination";
import * as React from "react";
import { Link } from "react-router-dom";
import { config } from "../../../config";
import { useFetch } from "../../../lib/useFetch";
export const Classes: React.FC = () => {
  const [classes, setClasses] = React.useState<string[]>([]);
  const [allClasses, setAllClasses] = React.useState<string[]>([]);

  const fetch = useFetch();

  React.useEffect(() => {
    fetch(`${config.API_BASEPATH}/classes`)
      .then((res) => res?.json())
      .then(setClasses)
      .catch(console.error);
  }, []);

  const handleDeleteClass = (teacherClass: string) => {
    fetch(`${config.API_BASEPATH}/classes/get-all-names`)
      .then((res) => res?.json())
      .then(setAllClasses)
      .catch(console.error);

    console.log(allClasses);

    fetch(`${config.API_BASEPATH}/classes/${teacherClass}`, {
      method: "DELETE",
    })
      .then((res) => res?.json())
      .catch(console.error);
  };

  return (
    <>
      <Stack direction="row" justifyContent="space-between">
        <Typography level="h2">Le mie classi</Typography>
      </Stack>
      <Table aria-label="basic table">
        <thead>
          <tr>
            <th colSpan={2}>Classe</th>
            <th colSpan={3} style={{ textAlign: "center" }}>
              Azioni
            </th>
          </tr>
        </thead>
        <tbody>
          {classes.map((teacherClass) => (
            <tr key={teacherClass}>
              <td colSpan={2}>
                <Typography level="h3">{teacherClass}</Typography>
              </td>
              <td style={{ textAlign: "center" }} colSpan={3}>
                <Button
                  style={{ marginRight: "5%" }}
                  component={Link}
                  to={`/teacher/classes/${teacherClass}`}
                >
                  Visualizza studenti
                </Button>
                <Button
                  style={{ marginRight: "5%" }}
                  onClick={() => handleDeleteClass(teacherClass)}
                >
                  elimina classe
                </Button>
                <Button
                  style={{ marginRight: "5%" }}
                  component={Link}
                  to={`/teacher/classes/${teacherClass}`}
                >
                  modifica classe
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pagination count={classes.length} variant="outlined" shape="rounded" />
      </Stack>
    </>
  );
};
