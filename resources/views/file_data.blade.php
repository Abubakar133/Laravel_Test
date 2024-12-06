<table>
    <tr>
        @foreach($data[0] as $column => $value)
        <th>{{ $column }}</th>
        @endforeach
    </tr>
    @foreach($data as $row)
    <tr>
        @foreach($row as $value)
        <td>{{ $value }}</td>
        @endforeach
    </tr>
    @endforeach
</table>
{{ $data->links() }}
