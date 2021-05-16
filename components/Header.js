import {AppBar, Container, IconButton, List, ListItem, ListItemText, Toolbar} from "@material-ui/core";
import {Home} from "@material-ui/icons";
import styles from "../styles/Header.module.scss";

function Header() {
    const navLinks = [
        //{ title: `Level Up`, path: `/level-up` },
        { title: `BUDS->MOTA`, path: `/buds-to-mota` },
        { title: `Complaints`, path: `/complaints` },
    ]

    return <AppBar position="sticky">
        <Toolbar>
            <Container className={styles.navbarDisplayFlex} maxWidth={"xl"} style={{display: `flex`}}>
                <IconButton href={"/"} edge="start" color="inherit" aria-label="home">
                    <Home fontSize="large" />
                </IconButton>
                {/* Add code */}
                <List className={styles.navDisplayFlex} component="nav" aria-labelledby="main navigation">
                    {navLinks.map(({ title, path }) => (
                        <a href={path} className={styles.linkText} key={title}>
                            <ListItem button className={styles.linkItem}>
                                <ListItemText primary={title} />
                            </ListItem>
                        </a>
                    ))}
                </List>
            </Container>
        </Toolbar>
    </AppBar>;
}

export default Header;