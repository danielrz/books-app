import { Box, Stack, Tab, Tabs, Typography, styled, CircularProgress } from "@mui/material";
import { useState } from "react";

interface BookTabsProps {
  tabs: { [x: string]: React.ReactNode };
  booksCount: number[];
}

export const CategoryContainer = styled(Box)(({ theme }) => ({
  border: `2px solid ${theme.palette.primary.main}`,
  borderRadius: theme.spacing(2),
}));

export const TabsHeader = styled(Box)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

export const SmallLoadingSpinner = styled(CircularProgress)(({ theme }) => ({
  maxHeight: "20px",
  maxWidth: "20px",
  color: theme.palette.primary.main,
}));

export const BookTabs = ({ tabs, booksCount }: BookTabsProps) => {
  const [tab, setTab] = useState(0);
  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setTab(newValue);
  };

  return (
    <CategoryContainer>
      <TabsHeader>
        <Stack direction="row" justifyContent="space-between">
          <Tabs value={tab} onChange={handleChange} aria-label="tabs">
            {Object.keys(tabs).map((tab, index) => (
              <Tab
                key={index}
                label={
                  <Typography variant="h6" fontWeight={550}>
                    {tab}
                  </Typography>
                }
              />
            ))}
          </Tabs>
        </Stack>
      </TabsHeader>
      <Box display="flex" justifyContent="end">
        <Typography variant="subtitle1" sx={{ pt: 1, pr: 2 }}>
          Showing {booksCount[tab]} books
        </Typography>
      </Box>
      {Object.values(tabs).map((currentTab, index) => (
        <Box role="tabpanel" key={index} hidden={tab !== index}>
          {currentTab}
        </Box>
      ))}
    </CategoryContainer>
  );
};