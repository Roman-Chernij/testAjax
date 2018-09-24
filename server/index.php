<?php
    require __DIR__ . "/model.php";
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Title</title>
    <link media="all" rel="stylesheet" href="css/style.min.css">
</head>
<body>
  <div class="container">
    <header>
        <h2>Header</h2>
    </header>
    <div class="product">
      <div id="productSection" class="grid-row">
        <?php foreach (getItems(1, 4) as $item): ?>
          <div class="grid-col grid-col-xlg-4 grid-col-lg-3 grid-col-md-2">
            <div class="product-holder">
              <div class="product-image">
                <img src="<?php echo $item['img']; ?>" alt="<?php echo $item['title']; ?>">
                <?php if ($item['discountCost'] !== null): ?>
                    <span class="product-status product-sale">sale</span>
                <?php endif; ?>
                <?php if ($item['new']): ?>
                    <span class="product-status product-new">new</span>
                <?php endif; ?>
              </div>
              <h2><?php echo $item['title']; ?></h2>
              <p><?php echo $item['description']; ?></p>
              <div class="product-price">
                <span class="product-price__cost">&#36; <?php echo $item['cost']; ?></span>
                <?php if ($item['discountCost'] !== null): ?>
                    <span class="product-price__discount"> &#36; <?php echo $item['discountCost']; ?></span>
                <?php endif; ?>
              </div>
              <div class="product-btn">
                <form>
                    <button type="submit" class="btn btn-secondary btn-secondary-outline">add to cart</button>
                </form>
                <a href="#" class="btn btn-primary">view</a>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
      <div class="grid-row">
        <button id="loadMore" type="button" class="btn btn-center btn-secondary btn-secondary-outline">load more</button>
      </div>
    </div>
    <footer class="footer">
      <div class="grid-row">
        <div class="grid-col grid-col-lg-3">
            <div class="footer-holder">
                <h3 class="footer__title">hot offers</h3>
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit magna, hend.</p>
                <ul class="list">
                    <li>
                        <a href="#">Vestibulum ante ipsum primis in faucibus orci luctus</a>
                    </li>
                    <li>
                        <a href="#">Nam elit magna hendrerit sit amet tincidunt ac</a>
                    </li>
                    <li>
                        <a href="#">Quisque diam lorem interdum vitae dapibus ac scele</a>
                    </li>
                    <li>
                        <a href="#">Donec eget tellus non erat lacinia fermentum</a>
                    </li>
                    <li>
                        <a href="#">Donec in velit vel ipsum auctor pulvin</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="grid-col grid-col-lg-3">
            <div class="footer-holder">
                <h3 class="footer__title">hot offers</h3>
                <p>Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae. Suspendisse sollicitudin velit sed leo. Ut pharetra augue nec augue. Nam elit magna, hend.</p>
                <ul class="list">
                    <li>
                        <a href="#">Vestibulum ante ipsum primis in faucibus orci luctus</a>
                    </li>
                    <li>
                        <a href="#">Nam elit magna hendrerit sit amet tincidunt ac</a>
                    </li>
                    <li>
                        <a href="#">Quisque diam lorem interdum vitae dapibus ac scele</a>
                    </li>
                    <li>
                        <a href="#">Donec eget tellus non erat lacinia fermentum</a>
                    </li>
                    <li>
                        <a href="#">Donec in velit vel ipsum auctor pulvin</a>
                    </li>
                </ul>
            </div>
        </div>
        <div class="grid-col grid-col-lg-3">
            <div class="footer-holder">
                <h3>store information</h3>
                <div class="contact icon-location">
                    <address>Company Inc., 8901 Marmora Road, Glasgow, D04 89GR</address>
                </div>
                <div class="contact icon-phone">
                    <span>Call us now toll free: <a href="tel:8002345-6789">(800) 2345-6789</a></span>
                </div>
                <div class="contact icon-mail">
                    <span>Customer support: <a href="mailto:support@example.com">support@example.com</a></span>
                    <span>Press:<a href="mailto:pressroom@example.com">pressroom@example.com</a></span>
                </div>
                <div class="contact icon-skype">
                    <span>Skype: <a href="skype:sample-username?call">sample-username</a></span>
                </div>
            </div>
        </div>
      </div>
    </footer>
  </div>
    <script src="js/build.min.js"></script>
</body>
</html>
