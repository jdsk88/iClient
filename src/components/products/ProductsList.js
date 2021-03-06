import React, { useRef } from "react";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useStyles } from "./styles_products";

export const ProductsList = ({ products }) => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);


    const handleExpandClick = () => {
        setExpanded(!expanded);
        console.log(expanded)
    };

    return (
        <div>
            {products.map((product) => (
                <Card className={classes.root} key={product._id}>

                    <CardHeader 
                        avatar={<Avatar aria-label="recipe" className={classes.avatar}>
                            R
              </Avatar>}
                        action={<IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>}
                        title={product.name}
                        subheader={product.price} />
                    <CardMedia
                        className={classes.media}
                        image={product.images}
                        title={product.name} />
                    <CardContent>
                        <Typography variant="body2" color="textSecondary" component="p">
                            {product._id}
                        </Typography>
                    </CardContent>
                    <CardActions disableSpacing>
                        <IconButton aria-label="add to favorites">
                            <FavoriteIcon />
                        </IconButton>
                        <IconButton aria-label="share">
                            <ShareIcon />
                        </IconButton>
                        <IconButton
                            className={clsx(classes.expand, {
                                [classes.expandOpen]: expanded,
                            })}
                            onClick={(e) => handleExpandClick(e.currentTarget)}
                            // onClick={handleExpandClick}
                            aria-expanded={expanded}
                            aria-label="show more"
                        >
                            <ExpandMoreIcon />
                        </IconButton>
                    </CardActions>
                    <Collapse in={expanded} timeout="auto" unmountOnExit>
                        <CardContent>
                            <Typography paragraph>Description:</Typography>
                            <Typography paragraph>
                                {product.description}
                            </Typography>
                            <Typography paragraph>

                            </Typography>
                            <Typography paragraph>

                            </Typography>
                            <Typography>

                            </Typography>
                        </CardContent>
                    </Collapse>
                </Card>
            ))}
        </ div>
    );
};
