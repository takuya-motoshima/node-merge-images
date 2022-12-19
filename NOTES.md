## ImageMagick image merging command
- Merge images vertically.
    ```sh
    convert -append sample2/1.jpg img/2.jpg img/3.jpg results/vertically.jpg
    ```
- Merge images vertically with margins.
    ```sh
    convert -background "#000" -size x30 img/1.jpg xc:none img/2.jpg xc:none img/3.jpg -append results/vertically-with-margins.jpg
    ```
- Merge images horizontally.
    ```sh
    convert +append img/1.jpg img/2.jpg img/3.jpg results/horizontally.jpg
    ```
- Merge images horizontally with margins.
    ```sh
    convert -background "#000" -size 30x img/1.jpg xc:none img/2.jpg xc:none img/3.jpg +append results/horizontally-with-margins.jpg
    ```